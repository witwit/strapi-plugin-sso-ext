# Single sign-on using Keycloak

This document provides instructions for integrating Keycloak as a Single Sign-On (SSO) provider for this plugin.

## Setup

1. Register your application in the Keycloak admin console and configure it to use Keycloak.
2. Create an OAuth2 client ID and secret.
3. Set up the required environment variables and pass them in to `config/plugins.js`.

## Available setting values

| Key                         | Required | Default                                                  |
| --------------------------- | -------- | -------------------------------------------------------- |
| KEYCLOAK_CLIENT_ID          | ✅       | -                                                        |
| KEYCLOAK_CLIENT_SECRET      | ✅       | -                                                        |
| KEYCLOAK_REALM              | ✅       | -                                                        |
| KEYCLOAK_SERVER_URL         | ✅       | -                                                        |
| KEYCLOAK_REDIRECT_URI       | -        | http://localhost:1337/strapi-plugin-sso-ext/keycloak/callback |
| KEYCLOAK_SCOPE              | -        | openid profile email                                     |

### Configuring environment variables

Use the following environment variables to configure the Keycloak integration:

1. `KEYCLOAK_CLIENT_ID`: The Client ID created in Keycloak.
2. `KEYCLOAK_CLIENT_SECRET`: The Client Secret created in Keycloak.
3. `KEYCLOAK_REALM`: The Realm created in Keycloak.
4. `KEYCLOAK_SERVER_URL`: The Server URL of Keycloak.
5. `KEYCLOAK_REDIRECT_URI`: The callback URL used by Keycloak to redirect the user after authentication. Defaults to 'http://localhost:1337/strapi-plugin-sso-ext/keycloak/callback'.
6. `KEYCLOAK_SCOPE`: The permissions your application requires from the user. Defaults to 'openid profile email'.

Make sure to replace the placeholders with the actual values you obtained from Keycloak.
