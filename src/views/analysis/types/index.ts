export type ControllerResult<T> = {
  code?: string;
  data?: T;
  msg?: string;
};

export interface dataScreenParam {
  category?: number; // 类别 0仪表盘 1数据大屏
  code?: string; // 样式JSON字符串
  createTime?: string; // 创建时间
  creator?: string; // 创建者
  id?: number; // 主键id
  image?: string; // 预览图
  isDeleted?: number; //
  name?: string; // 名称
  updateTime?: string; // 更新时间
  updater?: string; // 修改者
}

export interface dataScreenListParam {
  keyword?: string;
  pageNum: number;
  pageSize: number;
}

