import { RouteRecordRaw } from 'vue-router';

export const constantRouterMap: Array<RouteRecordRaw> = [
  { path: '/', name: '', redirect: '/hook' },
  {
    path: '/hook',
    name: 'hook',
    redirect: '/hook/hookList',
    component: () => import('@/page/index.vue'),
    children: [
      {
        path: 'hookList',
        components: {
          store: () => import('@/page/demo/store.vue'),
          model: () => import('@/page/demo/model.vue'),
          magnify: () => import('@/page/demo/magnify.vue'),
          password: () => import('@/page/demo/password.vue'),
          imageLazy: () => import('@/page/demo/imageLazy.vue'),
        },
      },
    ],
  },
];
