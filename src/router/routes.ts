import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '../stores/user';

function authGuard() {
  const { isLoggedIn } = useUserStore();
  if (isLoggedIn) {
    return true;
  }
  return '/login';
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        component: () => import('pages/ResidenciasPage.vue'),
        path: 'residencias',
      },
      {
        component: () => import('pages/ManutecoesPage.vue'),
        path: 'manutencoes',
      },
      {
        component: () => import('pages/SobrePage.vue'),
        path: 'sobre',
      },
    ],
    beforeEnter: authGuard,
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
