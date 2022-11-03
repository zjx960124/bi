import { PageEnum } from '@/types';
import { RouteRecordRaw } from 'vue-router';

const importRoute = {
  '.DATA_SOURCE': () => import('@/views/construction/datasource/index.vue'),
  '.DATA_SET': () => import('@/views/construction/dataset/index.vue'),
};

const constructionRoutes: RouteRecordRaw[] = [
  {
    path: PageEnum.DATA_SOURCE,
    name: PageEnum.DATA_SOURCE_NAME,
    component: importRoute['.DATA_SOURCE'],
    meta: {
      title: '数据源',
    },
  },
  {
    path: PageEnum.DATA_SET,
    name: PageEnum.DATA_SET_NAME,
    component: importRoute['.DATA_SET'],
    meta: {
      title: '数据集',
    },
  },
];

export default constructionRoutes;
