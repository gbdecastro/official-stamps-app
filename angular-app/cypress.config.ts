import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://172.24.176.130:4200',
    },

    env: {
        host: 'http://172.24.176.130:4200',
        api_url: 'http://172.24.176.130:3000/api/v1',
        keycloak_url: 'http://172.24.176.130:8080',
    },

    component: {
        devServer: {
            framework: 'angular',
            bundler: 'webpack',
        },
        specPattern: '**/*.cy.ts',
    },
});
