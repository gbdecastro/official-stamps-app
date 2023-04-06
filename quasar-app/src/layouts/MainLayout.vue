<template>
  <q-layout view="lHh Lpr lFf">
    <div class="btn-drawer">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
    </div>

    <div></div>

    <q-drawer
      class="drawer"
      v-model="leftDrawerOpen"
      :width="100"
      :breakpoint="500"
      bordered
      show-if-above
    >
      <q-scroll-area class="fit">
        <q-separator inset />

        <div class="logo">
          <img src="~assets/qr_code.svg" />
        </div>

        <q-separator inset />

        <div class="item-menu">
          <q-list>
            <MenuItem
              v-for="link in menuLinks"
              :key="link.path"
              v-bind="link"
            />
          </q-list>
        </div>

        <q-separator inset />
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="container">
      <q-page class="page-container" padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.btn-drawer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 0 1rem -5px 1rem;
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100px;
}

.q-drawer {
  z-index: 1 !important;
  min-height: calc(100vh - 50px);
  padding-top: 50px;
}

.item-menu {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.logo {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  cursor: pointer;

  & > img {
    width: 25%;
    height: 25%;
  }
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
  .page-container {
    width: 85vw;
    padding: 2rem;
  }
}
</style>

<script lang="ts">
import { IMenu } from "../components/models";
import { defineComponent, ref } from "vue";
import MenuItem from "../components/MenuItem.vue";

const menuLinks: IMenu[] = [
    {
        icon: "apartment",
        path: "registry-offices",
        title: "Registry Offices",
        name: "registry-offices",
    },
    {
        icon: "branding_watermark",
        path: "official-stamps",
        title: "Official Stamps",
        name: "official-stamps",
    },
];

export default defineComponent({
    name: "MainLayout",

    components: {
        MenuItem,
    },

    setup() {
        const leftDrawerOpen = ref(false);

        return {
            menuLinks: menuLinks,
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
        };
    },
});
</script>
