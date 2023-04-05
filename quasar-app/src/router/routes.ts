import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'registry-offices',
        component: () =>
          import('pages/registry-offices/RegistryOfficePage.vue'),
      },
      {
        path: 'official-stamps',
        component: () => import('pages/official-stamps/OfficialStampsPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
