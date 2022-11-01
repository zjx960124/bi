import { breadcrumbItem } from '@/types';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
export const useRouteStore = defineStore({
  id: 'route',
  state: () => ({
    currentEditorRoute: '',
    default_navication: '/dashboardManage',
    breadcrumbList: [
      {
        name: '仪表板',
        path: '/dashboardManage',
      },
    ],
  }),
  getters: {
    getBreadcrumbList(): breadcrumbItem[] {
      return this.breadcrumbList;
    },
    getcurrentEditorRoute(): string {
      return this.currentEditorRoute;
    },
  },
  actions: {
    async registerBreadcrumb(data: breadcrumbItem): Promise<void> {
      const current = this.breadcrumbList.findIndex(function (val) {
        console.log(data,val);
        
        return val.path === data.path;
      });
      
      current < 0 && this.breadcrumbList.push(data);
      current >= 0 &&
        this.breadcrumbList.push(...this.breadcrumbList.splice(current, 1));
      this.changeDefaultNavication();
    },
    async changeBreadcrumb(index: number): Promise<void> {
      this.breadcrumbList.push(...this.breadcrumbList.splice(index, 1));
      this.changeDefaultNavication();
    },
    async changeDefaultNavication(): Promise<void> {
      this.default_navication =
        this.breadcrumbList[this.breadcrumbList.length - 1]['path'];
    },
    async setCurrentEditorRoute(): Promise<void> {
      this.currentEditorRoute = router.currentRoute.value.name as string;
    },
  },
});
