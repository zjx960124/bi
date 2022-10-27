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

export enum editorType {
  release = '是否发布',
}

export interface DashboardItem {
  id: number | string | null;
  name: string;
  release?: boolean;
}

export interface DashboardList {
  folderName: string;
  list: Array<DashboardItem>;
}

// 鼠标点击左右键
export enum MouseEventButton {
  LEFT = 1,
  RIGHT = 2,
}

// 页面拖拽键名
export enum DragKeyEnum {
  DRAG_KEY = 'ChartData',
}

// 操作枚举
export enum MenuEnum {
  // 移动
  ARROW_UP = 'up',
  ARROW_RIGHT = 'right',
  ARROW_DOWN = 'down',
  ARROW_LEFT = 'left',
  // 删除
  DELETE = 'delete',
  // 复制
  COPY = 'copy',
  // 剪切
  CUT = 'cut',
  // 粘贴
  PARSE = 'parse',
  // 置顶
  TOP = 'top',
  // 置底
  BOTTOM = 'bottom',
  // 上移
  UP = 'up',
  // 下移
  DOWN = 'down',
  // 清空剪贴板
  CLEAR = 'clear',
  // 成组
  GROUP = 'group',
  // 解组
  UN_GROUP = 'unGroup',
  // 后退
  BACK = 'back',
  // 前进
  FORWORD = 'forward',
}

// Win 键盘枚举
export enum WinKeyboard {
  CTRL = 'ctrl',
  SHIFT = 'shift',
  ALT = ' alt',
  CTRL_SOURCE_KEY = 'control',
  SHIFT_SOURCE_KEY = 'shift',
  ALT_SOURCE_KEY = 'alt',
}

// Mac 键盘枚举
export enum MacKeyboard {
  // 还是用 Command 吧
  CTRL = '⌘',
  SHIFT = '⇧',
  ALT = '⌥',
  CTRL_SOURCE_KEY = '⌘',
  SHIFT_SOURCE_KEY = '⇧',
  ALT_SOURCE_KEY = '⌥',
}
