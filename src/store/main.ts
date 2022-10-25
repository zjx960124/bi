import { breadcrumbItem } from '@/types';
import { defineStore } from 'pinia';
import router from '@/router';
import changeBreadcrumb from '@/utils/directive/changeBreadcrumb';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: '超级管理员',
    hook_active: 'store',
    default_navication: 'dashboardManage',
    breadcrumb_list: [
      {
        name: '仪表盘',
        path: 'dashboardManage',
      },
    ],
  }),
  getters: {
    nameLength: (state) => state.name.length,
    hookActive: (state) => state.hook_active,
    breadcrumbList: (state) => {
      return state.breadcrumb_list;
    },
  },
  actions: {
    async insertPost(data: string) {
      // 可以做异步
      // await doAjaxRequest(data);
      this.name = data;
    },
    async registerBreadcrumb(data: breadcrumbItem) {
      const current = this.breadcrumbList.findIndex(function (val) {
        return val.name === data.name;
      });
      current < 0 && this.breadcrumbList.push(data);
      current >= 0 &&
        this.breadcrumbList.push(...this.breadcrumbList.splice(current, 1));
      this.changeDefaultNavication();
    },
    async changeBreadcrumb(index: number) {
      this.breadcrumbList.push(...this.breadcrumbList.splice(index, 1));
      this.changeDefaultNavication();
    },
    async changeDefaultNavication() {
      this.default_navication =
        this.breadcrumbList[this.breadcrumbList.length - 1]['path'];
    },
  },
});
