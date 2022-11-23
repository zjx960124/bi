interface checkDatasourceType {
  dataSourceShowName?: string;
  ipContent?: string;
  port?: number;
  dataSourceName?: string;
  username?: string;
  password?: string;
  excelDataSourceShowName?: string
  dataSourceType?: number | string
  status?: number
  accessType?: number
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
  dataSourceShowName?: string
  accessType?: number
  creator?: string
  icon?: string
  id?:number
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
  isOpen: boolean
}

//Excel上传文件
interface excelType {
  files?: FormData
}

export {
  checkDatasourceType,
  dataTypes,
  drawerTypes,
  datasourceType,
  DataSourceListType,
  statusFormType,
  excelType
}