import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://<your-ip>:4200',
    },

    env: {
        host: 'http://<your-ip>:4200',
        api_url: 'http://<your-ip>:3000/api/v1',
        keycloak_url: 'http://<your-ip>:8080',
    },

    component: {
        devServer: {
            framework: 'angular',
            bundler: 'webpack',
        },
        specPattern: '**/*.cy.ts',
    },
});
