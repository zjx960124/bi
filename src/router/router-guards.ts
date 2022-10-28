import { Router, useRoute } from 'vue-router';
import { PageEnum } from '@/types';
import { loginCheck } from '@/utils';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/css/nprogress.css'; // 进度条样式

export function createRouterGuards(router: Router) {
  // 前置
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const isErrorPage = router
      .getRoutes()
      .findIndex((item) => item.name === to.name);
    if (isErrorPage === -1) {
      next({ name: PageEnum.ERROR_PAGE_NAME_404 });
    }

    if (!loginCheck()) {
      if (to.name === PageEnum.BASE_LOGIN_NAME) {
        next();
      }
      next({ name: PageEnum.BASE_LOGIN_NAME });
    }
    next();
  });

  router.afterEach((to, _, failure) => {
    document.title = (to?.meta?.title as string) || document.title;
    NProgress.done();
  });

  // 错误
  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
