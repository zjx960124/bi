export interface HttpResponse {
  status: number;
  statusText: string;
  data: {
    code: number;
    desc: string;
    [key: string]: any;
  };
}

export enum PageEnum {
  // 登录
  BASE_LOGIN = '/login',
  BASE_LOGIN_NAME = 'Login',

  BASE_HOME = '/layout',
  BASE_HOME_NAME = 'layout',

  ERROR_PAGE_NAME_404 = '404',

  DASHBOARD_MANAGE = '/dashboardManage',
  DASHBOARD_MANAGE_NAME = 'dashboardManage',

  SCREEN_MANAGE = '/screenManage',
  SCREEN_MANAGE_NAME = 'screenManage',
}

export interface breadcrumbItem {
  name: string;
  path: string;
}
