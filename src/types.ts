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
}
