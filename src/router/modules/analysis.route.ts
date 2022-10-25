import { PageEnum } from '@/types';
import { RouteRecordRaw } from 'vue-router';

const importRoute = {
  '.DASHBOARD_MANAGE': () => import('@/views/analysis/dashboard/dashboard.vue'),
  '.SCREEN_MANAGE': () => import('@/views/analysis/screen/screen.vue'),
};

const analysisRoutes: RouteRecordRaw[] = [
  {
    path: PageEnum.DASHBOARD_MANAGE,
    name: PageEnum.DASHBOARD_MANAGE_NAME,
    component: importRoute['.DASHBOARD_MANAGE'],
    meta: {
      title: '仪表盘',
    },
  },
  {
    path: PageEnum.SCREEN_MANAGE,
    name: PageEnum.SCREEN_MANAGE_NAME,
    component: importRoute['.SCREEN_MANAGE'],
    meta: {
      title: '数据大屏',
    },
  },
];

export default analysisRoutes;