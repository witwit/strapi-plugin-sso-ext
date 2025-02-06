<div align="center">
 <img src="https://github.com/yasudacloud/strapi-plugin-sso/blob/main/docs/strapi-plugin-sso.png?raw=true" width="180"/>
</div>

# Strapi plugin strapi-plugin-sso-ext

This plugin can provide single sign-on.

You will be able to log in to the administration screen using one of the following providers:

- Google
- Cognito
- Azure
- OIDC
- Keycloak

Please read the [documents](#user-content-documentationenglish) for some precautions.

**If possible, consider using the Gold Plan features.**

# Version

| NodeJS          | Strapi | strapi-plugin-sso-ext |
|-----------------|--------|-----------------------|
| 18.0.0 - 22.0.0 | v5     | 1.\*.\*               |

# Easy to install

```shell
yarn add strapi-plugin-sso-ext
```

or

```shell
npm i strapi-plugin-sso-ext
```

# Requirements

- **strapi-plugin-sso-ext**
- Google Account or AWS Cognito UserPool or a OIDC provider or Keycloak

# Example Configuration

```javascript
// config/plugins.js
module.exports = ({env}) => ({
  'strapi-plugin-sso-ext': {
    enabled: true,
    config: {
      // Either sets token to session storage if false or local storage if true
      REMEMBER_ME: false,
      // Google
      GOOGLE_OAUTH_CLIENT_ID: '[Client ID created in GCP]',
      GOOGLE_OAUTH_CLIENT_SECRET: '[Client Secret created in GCP]',
      GOOGLE_OAUTH_REDIRECT_URI: 'http://localhost:1337/strapi-plugin-sso-ext/google/callback', // URI after successful login
      GOOGLE_ALIAS: '', // Gmail Aliases
      GOOGLE_GSUITE_HD: '', // G Suite Primary Domain

      // Cognito
      COGNITO_OAUTH_CLIENT_ID: '[Client ID created in AWS Cognito]',
      COGNITO_OAUTH_CLIENT_SECRET: '[Client Secret created in AWS Cognito]',
      COGNITO_OAUTH_DOMAIN: '[OAuth Domain created in AWS Cognito]',
      COGNITO_OAUTH_REDIRECT_URI: 'http://localhost:1337/strapi-plugin-sso-ext/cognito/callback', //  // URI after successful login
      COGNITO_OAUTH_REGION: 'ap-northeast-1', // AWS Cognito Region 

      // AzureAD
      AZUREAD_OAUTH_REDIRECT_URI: 'http://localhost:1337/strapi-plugin-sso-ext/azuread/callback',
      AZUREAD_TENANT_ID: '[Tenant ID created in AzureAD]',
      AZUREAD_OAUTH_CLIENT_ID: '[Client ID created in AzureAD]', // [Application (client) ID]
      AZUREAD_OAUTH_CLIENT_SECRET: '[Client Secret created in AzureAD]',
      AZUREAD_SCOPE: 'user.read', // https://learn.microsoft.com/en-us/graph/permissions-reference

      // OpenID Connect
      OIDC_REDIRECT_URI: 'http://localhost:1337/strapi-plugin-sso-ext/oidc/callback', // URI after successful login
      OIDC_CLIENT_ID: '[Client ID from OpenID Provider]',
      OIDC_CLIENT_SECRET: '[Client Secret from OpenID Provider]',

      OIDC_SCOPES: 'openid profile email', // https://oauth.net/2/scope/
      // API Endpoints required for OIDC
      OIDC_AUTHORIZATION_ENDPOINT: '[API Endpoint]',
      OIDC_TOKEN_ENDPOINT: '[API Endpoint]',
      OIDC_USER_INFO_ENDPOINT: '[API Endpoint]',
      OIDC_USER_INFO_ENDPOINT_WITH_AUTH_HEADER: false,
      OIDC_GRANT_TYPE: 'authorization_code', // https://oauth.net/2/grant-types/
      // customizable username arguments
      OIDC_FAMILY_NAME_FIELD: 'family_name',
      OIDC_GIVEN_NAME_FIELD: 'given_name',

      // Keycloak
      KEYCLOAK_CLIENT_ID: '[Client ID created in Keycloak]',
      KEYCLOAK_CLIENT_SECRET: '[Client Secret created in Keycloak]',
      KEYCLOAK_REALM: '[Realm created in Keycloak]',
      KEYCLOAK_SERVER_URL: '[Server URL of Keycloak]',
      KEYCLOAK_REDIRECT_URI: 'http://localhost:1337/strapi-plugin-sso-ext/keycloak/callback',
      KEYCLOAK_SCOPE: 'openid profile email',

      USE_WHITELIST: true, // allow authentication only at the specified email address.
      SHOW_EMAIL_LOGIN: env('SHOW_EMAIL_LOGIN', true) // show or hide email login
    }
  }
})
```

Of the above, the environment variable for the provider you wish to use is all that is needed.

# Documentation(English)

[Google Single Sign On Setup](https://github.com/yasudacloud/strapi-plugin-sso/blob/main/docs/en/google/setup.md)

[Google Single Sign On Specifications](https://github.com/yasudacloud/strapi-plugin-sso/blob/main/docs/en/google/admin.md)

[Cognito Single Sign On Setup](https://github.com/yasudacloud/strapi-plugin-sso/blob/main/docs/en/cognito/setup.md)

[AzureAD Single Sign On Setup](https://github.com/yasudacloud/strapi-plugin-sso/blob/main/docs/en/azuread/setup.md)

[OIDC Single Sign On Setup](https://github.com/yasudacloud/strapi-plugin-sso/blob/main/docs/en/oidc/setup.md)

[Keycloak Single Sign On Setup](https://github.com/yasudacloud/strapi-plugin-sso/blob/main/docs/en/keycloak/setup.md)

[whitelist](https://github.com/yasudacloud/strapi-plugin-sso/blob/main/docs/whitelist.md)

# Demo

![CognitoDemo](https://github.com/yasudacloud/strapi-plugin-sso/blob/main/docs/demo.gif?raw=true "DemoMovie")
