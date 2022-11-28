export interface IConfig {
  env: string; // 开发环境
  mock?: boolean; // mock数据
  title: string; // 项目title
  baseApi?: string; // api请求地址
  mockApi?: string; // mock地址
}

const dev: IConfig = {
  env: 'development',
  mock: true,
  title: '开发',
  baseApi: '/', // 本地api请求地址,注意：如果你使用了代理，请设置成'/'
  mockApi: '/gapi',
};

const prod: IConfig = {
  env: 'production',
  mock: false,
  title: '生产',
  baseApi: 'http://192.168.1.101', // 正式api请求地址
  mockApi: 'xxx',
};

export const config: IConfig =
  import.meta.env.MODE === 'development' ? dev : prod;
