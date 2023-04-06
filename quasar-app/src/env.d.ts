/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    VUE_APP_BASE_URL_API: string;
    VUE_APP_ETHERuEM_NETWORK: string;
    VUE_APP_KEYCLOAK_URL: string;
    VUE_APP_KEYCLOAK_REALM: string;
    VUE_APP_KEYCLOAK_CLIENT_ID: string;
  }
}
