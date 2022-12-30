import { PageEnum } from '@/types';
import type { App } from 'vue';
import {
  createRouter,
  createWebHashHistory,
  RouteMeta,
  RouteRecordRaw,
} from 'vue-router';
import { constantRouterMap } from './router.config';
import { createRouterGuards } from './router-guards';
import modules from '@/router/modules';

const Layout = () => import('@/views/layout/index.vue');
const editor = () => import('@/views/editor');
const dashboardEditor = () => import('@/views/analysis/dashboard/editor');
const preview = () => import('@/views/preview/index.vue');
const dashboardPreview = () => import('@/views/dashboardPreview/index.vue');
const canvasd = () => import('@/views/editor/canvas/index.vue');

interface metaType extends RouteMeta {
  isShow?: boolean;
}
const RootRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.DASHBOARD_MANAGE,
    component: Layout,
    meta: {
      title: '数据分析',
      icon: '',
      isShow: true,
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
      isShow: true,
    } as metaType,
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
      isShow: true,
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
    path: '/canvasd',
    name: 'canvasd',
    component: canvasd,
    meta: {
      title: 'canvasd',
      icon: '',
    },
  },
  {
    path: '/dashboardEditor',
    name: 'dashboardEditor',
    component: dashboardEditor,
    meta: {
      title: 'dashboardEditor',
      icon: '',
    },
  },
  {
    path: '/preview',
    name: 'preview',
    component: preview,
    meta: {
      titile: '预览',
      icon: '',
    },
  },
  {
    path: '/dashboardPreview',
    name: 'dashboardPreview',
    component: dashboardPreview,
    meta: {
      titile: '预览',
      icon: '',
    }
  }
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
