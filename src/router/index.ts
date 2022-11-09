import { PageEnum } from '@/types';
import type { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { constantRouterMap } from './router.config';
import { createRouterGuards } from './router-guards';
import modules from '@/router/modules';

const Layout = () => import('@/views/layout/index.vue');
const editor = () => import('@/views/editor');

const RootRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.DASHBOARD_MANAGE,
    component: Layout,
    meta: {
      title: '数据分析',
      icon: '',
    },
    children: [...modules.analysisRoutes],
  },
  {
    path: '/templateCenter',
    name: 'template',
    component: Layout,
    redirect: PageEnum.TEMMPLATE_CENTER,
    meta: {
      title: '模板中心',
      icon: 'data1',
    },
    children: [
      {
        path: '/templateCenter',
        name: 'templateCenter',
        component: () => import('@/views/template'),
        meta: { title: '模板中心' },
      },
    ],
  },
  {
    path: '/dataConstruction',
    name: 'dataConstruction',
    component: Layout,
    redirect: PageEnum.DATA_SOURCE,
    meta: {
      title: '数据构建',
    },
    children: [...modules.constructionRoutes],
  },
];

const EditorRoute: Array<RouteRecordRaw> = [
  {
    path: '/editor',
    name: 'editor',
    component: editor,
    meta: {
      title: 'editor',
      icon: '',
    },
  },
  {
    path: '/dashboardEditor',
    name: 'dashboardEditor',
    component: editor,
    meta: {
      title: 'editor',
      icon: '',
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
