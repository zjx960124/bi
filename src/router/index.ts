import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRouterMap } from './router.config';
import { createRouterGuards } from './router-guards';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRouterMap,
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}
export default router;
