import { boot } from "quasar/wrappers"
import { toBRL } from "./filters/currency.filter"

const filters = {
    toBRL,
}

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $filters: typeof filters
    }
}

export default boot(({ app }) => {
    app.config.globalProperties.$filters = filters
})
