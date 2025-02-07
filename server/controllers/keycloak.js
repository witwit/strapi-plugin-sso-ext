import axios from "axios";
import { randomUUID } from "crypto";
import pkceChallenge from "pkce-challenge";

const configValidation = () => {
  const config = strapi.config.get("plugin::strapi-plugin-sso-ext");
  if (
    config["KEYCLOAK_CLIENT_ID"] &&
    config["KEYCLOAK_CLIENT_SECRET"] &&
    config["KEYCLOAK_REALM"] &&
    config["KEYCLOAK_SERVER_URL"]
  ) {
    return config;
  }
  throw new Error(
    "KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET, KEYCLOAK_REALM, and KEYCLOAK_SERVER_URL are required"
  );
};

const OAUTH_ENDPOINT = (serverUrl, realm) =>
  `${serverUrl}/realms/${realm}/protocol/openid-connect/auth`;
const OAUTH_TOKEN_ENDPOINT = (serverUrl, realm) =>
  `${serverUrl}/realms/${realm}/protocol/openid-connect/token`;
const OAUTH_USER_INFO_ENDPOINT = (serverUrl, realm) =>
  `${serverUrl}/realms/${realm}/protocol/openid-connect/userinfo`;
const OAUTH_GRANT_TYPE = "authorization_code";
const OAUTH_RESPONSE_TYPE = "code";

async function keycloakSignIn(ctx) {
  const config = configValidation();
  const redirectUri = encodeURIComponent(config["KEYCLOAK_REDIRECT_URI"]);
  const endpoint = OAUTH_ENDPOINT(
    config["KEYCLOAK_SERVER_URL"],
    config["KEYCLOAK_REALM"]
  );

  const { code_verifier: codeVerifier, code_challenge: codeChallenge } =
    pkceChallenge();
  ctx.session.codeVerifier = codeVerifier;

  const url = `${endpoint}?client_id=${config["KEYCLOAK_CLIENT_ID"]}&redirect_uri=${redirectUri}&scope=${config["KEYCLOAK_SCOPE"]}&response_type=${OAUTH_RESPONSE_TYPE}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
  ctx.set("Location", url);
  return ctx.send({}, 302);
}

async function keycloakSignInCallback(ctx) {
  const config = configValidation();
  const userService = strapi.service("admin::user");
  const tokenService = strapi.service("admin::token");
  const oauthService = strapi.plugin("strapi-plugin-sso-ext").service("oauth");
  const roleService = strapi.plugin("strapi-plugin-sso-ext").service("role");
  const whitelistService = strapi
    .plugin("strapi-plugin-sso-ext")
    .service("whitelist");

  if (!ctx.query.code) {
    return ctx.send(oauthService.renderSignUpError("code Not Found"));
  }

  const params = new URLSearchParams();
  params.append("code", ctx.query.code);
  params.append("client_id", config["KEYCLOAK_CLIENT_ID"]);
  params.append("client_secret", config["KEYCLOAK_CLIENT_SECRET"]);
  params.append("redirect_uri", config["KEYCLOAK_REDIRECT_URI"]);
  params.append("grant_type", OAUTH_GRANT_TYPE);
  params.append("code_verifier", ctx.session.codeVerifier);

  try {
    const tokenEndpoint = OAUTH_TOKEN_ENDPOINT(
      config["KEYCLOAK_SERVER_URL"],
      config["KEYCLOAK_REALM"]
    );
    const response = await axios.post(tokenEndpoint, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const userResponse = await axios.get(
      OAUTH_USER_INFO_ENDPOINT(
        config["KEYCLOAK_SERVER_URL"],
        config["KEYCLOAK_REALM"]
      ),
      {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      }
    );

    await whitelistService.checkWhitelistForEmail(userResponse.data.email);

    const dbUser = await userService.findOneByEmail(userResponse.data.email);
    let activateUser;
    let jwtToken;

    if (dbUser) {
      activateUser = dbUser;
      jwtToken = await tokenService.createJwtToken(dbUser);
    } else {
      const keycloakRoles = await roleService.keycloakRoles();
      const roles =
        keycloakRoles && keycloakRoles["roles"]
          ? keycloakRoles["roles"].map((role) => ({ id: role }))
          : [];

      const defaultLocale = oauthService.localeFindByHeader(
        ctx.request.headers
      );
      activateUser = await oauthService.createUser(
        userResponse.data.email,
        userResponse.data.family_name,
        userResponse.data.given_name,
        defaultLocale,
        roles
      );
      jwtToken = await tokenService.createJwtToken(activateUser);

      await oauthService.triggerWebHook(activateUser);
    }

    oauthService.triggerSignInSuccess(activateUser);

    const nonce = randomUUID();
    const html = oauthService.renderSignUpSuccess(
      jwtToken,
      activateUser,
      nonce
    );
    ctx.set("Content-Security-Policy", `script-src 'nonce-${nonce}'`);
    ctx.send(html);
  } catch (e) {
    console.error(e);
    ctx.send(oauthService.renderSignUpError(e.message));
  }
}

export default {
  keycloakSignIn,
  keycloakSignInCallback,
};
