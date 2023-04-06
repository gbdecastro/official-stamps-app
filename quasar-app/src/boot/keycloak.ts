import axios, { AxiosInstance } from "axios"
import Keycloak from "keycloak-js"
import { boot } from "quasar/wrappers"
import { KeycloakStore } from "../stores/keycloak-store"

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $axios: AxiosInstance
        $api: AxiosInstance
    }
}

const keycloak = new Keycloak({
    url: "http://172.24.176.130:8080",
    realm: "official-stamps-portal",
    clientId: "official-stamps-app",
})

const api = axios.create({
    baseURL: "http://172.24.176.130:3000/api/v1",
})

export default boot(async ({ app, router }) => {
    const keycloakStore = KeycloakStore()

    app.config.globalProperties.$axios = axios

    app.config.globalProperties.$api = api

    await keycloak
        .init({
            onLoad: "check-sso",
            flow: "standard",
            pkceMethod: "S256",
            silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
            checkLoginIframe: false,
        })
        .then(async (authenticated) => {
            if (authenticated) {
                keycloakStore.setAuthenticated(authenticated)
                keycloakStore.setToken(keycloak.token as string)
                keycloakStore.setRefreshToken(keycloak.refreshToken as string)
                keycloakStore.setTokenExpiration(keycloak.tokenParsed?.exp as number)

                app.config.globalProperties.$api.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = `Bearer ${keycloak.token}`
                        return config
                    },
                    async (reject) => {
                        const token = await keycloak.updateToken(5)
                        app.config.globalProperties.$api.interceptors.request.use(
                            (config) => {
                                config.headers.Authorization = `Bearer ${token}`
                                return config
                            },
                            (reject) => {
                                console.error(reject)
                            }
                        )
                        console.error(reject)
                    }
                )
            } else {
                await keycloak.login()
            }

            router.beforeEach((to, from, next) => {
                if (to.meta.requiresAuth && !authenticated) {
                    keycloak.login()
                } else {
                    next()
                }
            })
        })
        .catch((err) => {
            console.error("Failed to initialize Keycloak", err)
        })
})
