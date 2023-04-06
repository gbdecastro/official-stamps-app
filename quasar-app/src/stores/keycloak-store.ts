import { defineStore } from 'pinia';

export const KeycloakStore = defineStore('keycloak', {
  state: () => ({
    authenticated: false,
    token: '',
    refreshToken: '',
    tokenExpiration: 0,
    profile: '',
  }),

  actions: {
    setAuthenticated(authenticated: boolean) {
      this.authenticated = authenticated;
    },
    setToken(token: string) {
      this.token = token;
    },
    setRefreshToken(refreshToken: string) {
      this.refreshToken = refreshToken;
    },
    setTokenExpiration(tokenExpiration: number) {
      this.tokenExpiration = tokenExpiration;
    },
    setProfile(profile: string) {
      this.profile = profile;
    },
  },
});
