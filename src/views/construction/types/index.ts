interface checkDatasourceType {
  dataSourceShowName?: string;
  ipContent?: string;
  port?: number;
  dataSourceName?: string;
  username?: string;
  password?: string;
  fileName?: string
  dataSourceType?: number | string
  status?:number
  accessType?:number
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
  isOpen:boolean
}

export {
  checkDatasourceType,
  dataTypes,
  drawerTypes,
  datasourceType,
  DataSourceListType,
  statusFormType
}