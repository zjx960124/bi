import { PageEnum } from '@/types';
import { RouteRecordRaw } from 'vue-router';

const importRoute = {
  '.DATA_SOURCE': () => import('@/views/construction/datasource/index.vue'),
  '.DATA_SET': () => import('@/views/construction/dataset/index.vue'),
  '.PREVIEW': () => import('@/views/preview/index.vue'),
  '.DATA_SOURCE_LIST': () => import('@/views/construction/datasource/list.vue'),
};

const constructionRoutes: RouteRecordRaw[] = [
  {
    path: PageEnum.DATA_SOURCE,
    name: PageEnum.DATA_SOURCE_NAME,
    component: importRoute['.DATA_SOURCE'],
    meta: {
      title: '数据源',
      isShow:true
    },
  },
  {
    path: PageEnum.DATA_SET,
    name: PageEnum.DATA_SET_NAME,
    component: importRoute['.DATA_SET'],
    meta: {
      title: '数据集',
      isShow:true
    },
  },
  {
    path: PageEnum.PREVIEW,
    name: PageEnum.PREVIEW_NAME,
    component: importRoute['.PREVIEW'],
    meta: {
      title: '预览页',
      isShow:true
    },
  },
  {
    path: PageEnum.DATA_SOURCE_LIST,
    name: PageEnum.DATA_SOURCE_LIST_NAME,
    component: importRoute['.DATA_SOURCE_LIST'],
    meta: {
      title: '数据源',
      isShow:false
    },
  },
  {
    path: '/dataset/create',
    name: 'dataset_create',
    component: ()=>import('@/views/construction/dataset/addExcel.vue'),
    meta: {
      title: '新建数据集',
      isShow:false
    },
  },
];

export default constructionRoutes;
