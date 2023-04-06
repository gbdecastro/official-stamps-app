import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: 'registry-offices',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'registry-offices',
        name: 'registry-offices',
        component: () =>
          import('pages/registry-offices/RegistryOfficePage.vue'),
      },
      {
        path: 'official-stamps',
        name: 'official-stamps',
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
