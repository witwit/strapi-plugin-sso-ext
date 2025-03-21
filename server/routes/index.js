export default [
  {
    method: "GET",
    path: "/google",
    handler: "google.googleSignIn",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/google/callback",
    handler: "google.googleSignInCallback",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/cognito",
    handler: "cognito.cognitoSignIn",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/cognito/callback",
    handler: "cognito.cognitoSignInCallback",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/azuread",
    handler: "azuread.azureAdSignIn",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/azuread/callback",
    handler: "azuread.azureAdSignInCallback",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/sso-roles",
    handler: "role.find",
  },
  {
    method: "PUT",
    path: "/sso-roles",
    handler: "role.update",
  },
  {
    method: "GET",
    path: "/oidc",
    handler: "oidc.oidcSignIn",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/oidc/callback",
    handler: "oidc.oidcSignInCallback",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/whitelist",
    handler: "whitelist.info",
  },
  {
    method: "POST",
    path: "/whitelist",
    handler: "whitelist.register",
  },
  {
    method: "DELETE",
    path: "/whitelist/:id",
    handler: "whitelist.removeEmail",
  },
  {
    method: "GET",
    path: "/keycloak",
    handler: "keycloak.keycloakSignIn",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/keycloak/callback",
    handler: "keycloak.keycloakSignInCallback",
    config: {
      auth: false,
    },
  },
];
