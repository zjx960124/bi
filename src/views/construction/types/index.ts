interface checkDatasourceType {
  dataSourceShowName?: string;
  dataSourceUrl?: string;
  port?: number;
  dataSourceName?: string;
  username?: string;
  password?: string;
  fileName?: string
  dataSourceType?: number | string
}


interface dataTypes {
  type?: string;
  title?: string;
}

interface drawerTypes {
  type?: string
  drawer?: boolean
}

interface datasourceType {
  title?: string
  type?: string
  creater?: string
}

//获取数据源列表
interface DataSourceListType {
  pageNum: number
  pageSize: number
  showName?: string
}

//状态栏盒子
interface statusFormType {
  status?: string | number
  text?: string
}

export {
  checkDatasourceType,
  dataTypes,
  drawerTypes,
  datasourceType,
  DataSourceListType,
  statusFormType
}