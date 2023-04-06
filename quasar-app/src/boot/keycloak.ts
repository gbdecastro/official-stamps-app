import Keycloak from 'keycloak-js';
import { KeycloakStore } from '../stores/keycloak-store';
import { boot } from 'quasar/wrappers';

export default boot(async ({ app, router }) => {
  const keycloakStore = KeycloakStore();

  const keycloak = new Keycloak({
    url: 'http://172.24.176.130:8080',
    realm: 'official-stamps-portal',
    clientId: 'official-stamps-app',
  });

  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      flow: 'standard',
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri:
        window.location.origin + '/silent-check-sso.html',
      checkLoginIframe: false,
    });

    if (authenticated) {
      keycloakStore.setAuthenticated(authenticated);
      keycloakStore.setToken(keycloak.token as string);
      keycloakStore.setRefreshToken(keycloak.refreshToken as string);
      keycloakStore.setTokenExpiration(keycloak.tokenParsed?.exp as number);

      app.config.globalProperties.$axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
        return config;
      });
    }

    router.beforeEach((to, from, next) => {
      if (to.meta.requiresAuth && !authenticated) {
        keycloak.login();
      } else {
        next();
      }
    });
  } catch (err) {
    console.error('Failed to initialize Keycloak', err);
  }
});
