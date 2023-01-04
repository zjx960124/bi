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
      isShow: true
    },
  },
  {
    path: '/dataset',
    name: 'dataset_index',
    component: () => import('@/views/construction/dataset/index.vue'),
    meta: {
      title: '数据集',
      isShow: true
    },
  },
  {
    path: PageEnum.PREVIEW,
    name: PageEnum.PREVIEW_NAME,
    component: importRoute['.PREVIEW'],
    meta: {
      title: '预览页',
      isShow: false
    },
  },
  {
    path: '/datasource/list',
    name: 'datasource_list',
    component: () => import('@/views/construction/datasource/list.vue'),
    meta: {
      title: '数据源',
      isShow: false
    },
  },
  {
    path: '/dataset/create/excel',
    name: 'dataset_create_excel',
    component: () => import('@/views/construction/dataset/addExcel.vue'),
    meta: {
      title: '新建EXCEL数据集/替换数据/追加数据',
      isShow: false
    },
  },
  {
    path: '/dataset/create/sql',
    name: 'dataset_create_sql',
    component: () => import('@/views/construction/dataset/addSql.vue'),
    meta: {
      title: '新建(编辑)sql(数据库)数据集',
      isShow: false
    },
  },
  {
    path: '/dataset/list',
    name: 'dataset_list',
    component: () => import('@/views/construction/dataset/dataIndex.vue'),
    meta: {
      title: '数据集',
      isShow: false
    },
  },
];

export default constructionRoutes;
