<template>
  <q-item clickable class="row justify-center">
    <q-item-section v-if="icon" avatar class="items-center no-padding">
      <q-tooltip>
        {{ title }}
      </q-tooltip>
      <q-icon :color="itemActive(name)" @click="onRouter(path)" :name="icon" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "MenuItem",
    props: {
        path: {
            type: String,
            required: true,
            default: "",
        },
        title: {
            required: true,
            default: "",
        },
        icon: {
            type: String,
            required: true,
            default: "",
        },
        name: {
            type: String,
            required: true,
            default: "",
        },
    },
    methods: {
        onRouter(path: string) {
            this.$router.push(path);
        },
        itemActive(name: string): string {
            return this.$route.name === name ? "primary" : "grey";
        },
    },
});
</script>
