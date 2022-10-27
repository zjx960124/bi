import { PageEnum } from '@/types';
import type { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { constantRouterMap } from './router.config';
import { createRouterGuards } from './router-guards';
import modules from '@/router/modules';

const Layout = import('@/views/layout/index.vue');
const editor = import('@/views/editor');

const RootRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.DASHBOARD_MANAGE,
    component: Layout,
    meta: {
      title: 'Root',
    },
    children: [...modules.analysisRoutes],
  },
];

const EditorRoute: Array<RouteRecordRaw> = [
  {
    path: '/editor',
    name: 'editor',
    component: editor,
    meta: {
      title: 'editor',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...RootRoute, ...EditorRoute],
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}
export default router;
