export const environment = {
    BASE_URL_API: 'http://172.24.176.130:3000/api/v1',
    ETHEREM_NETWORK: 'http://172.24.176.130:8545/',
    keycloak: {
        config: {
            url: 'http://172.24.176.130:8080',
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
