import axios, { AxiosInstance } from "axios"
import Keycloak from "keycloak-js"
import { boot } from "quasar/wrappers"
import { KeycloakStore } from "../stores/keycloak-store"

const keycloak = new Keycloak({
    url: process.env.VUE_APP_KEYCLOAK_URL,
    realm: process.env.VUE_APP_KEYCLOAK_REALM,
    clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
})

const httpApi = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL_API,
})

function interceptor(httpApi: AxiosInstance, keycloak: Keycloak): void {
    httpApi.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${keycloak.token}`
        return config
    })

    httpApi.interceptors.response.use(
        (config) => {
            return config.data
        },
        async (reject) => {
            if (reject.response.data.statusCode === 401) {
                const token = await keycloak.updateToken(5)
                httpApi.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = `Bearer ${token}`
                        return config
                    },
                    (reject) => {
                        console.error(reject)
                    }
                )
                return httpApi(reject.config)
            }
            return Promise.reject(reject)
        }
    )
}

export default boot(async ({ router }) => {
    const keycloakStore = KeycloakStore()

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
                interceptor(httpApi, keycloak)
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

export { httpApi }
