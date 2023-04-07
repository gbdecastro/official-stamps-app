<template>
    <q-ajax-bar :hijack-filter="myFilterFn" />
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    name: "App",
    setup() {
        return {
            myFilterFn(url: string) {
                return url.includes(process.env.VUE_APP_BASE_URL_API)
            },
        }
    },
})
</script>
