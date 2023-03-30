export const environment = {
    BASE_URL_API: 'http://<your-ip>:3000/api/v1',
    ETHEREM_NETWORK: 'http://<your-ip>:8545/',
    keycloak: {
        config: {
            url: 'http://<your-ip>:8080',
            realm: 'official-stamps-portal',
            clientId: 'official-stamps-app',
        },
        loadUserProfileAtStartUp: true,
        initOptions: {
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri:
                window.location.origin + '/assets/silent-check-sso.html',
            checkLoginIframe: false,
        },
        bearerExcludedUrls: [],
    },
};
