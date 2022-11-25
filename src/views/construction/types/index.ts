interface checkDatasourceType {
  dataSourceShowName?: string;
  ipContent?: string;
  port?: number | string;
  dataSourceName?: string;
  username?: string;
  password?: string;
  excelDataSourceShowName?: string
  dataSourceType?: number | string
  status?: number
  accessType?: number
  createTime?: string
  dataSourceUrl?: string
  id?: number
  isDeleted?: number
  updateTime?: string
  updater?: string
  creator?: string
  dataSourceId?: number
  tableName?:string
}


interface dataTypes {
  type?: string;
  title?: string;
}

interface drawerTypes {
  type?: string
  drawer?: boolean
}


//获取数据源列表
interface DataSourceListType {
  pageNum: number
  pageSize: number
  showName?: string
  accessType?:number
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


//根据id获取excel数据
interface excelByIdType {
  dataSourceId?:number
  pageNum?:number
  pageSize?:number
  counts?:number
}

export {
  checkDatasourceType,
  dataTypes,
  drawerTypes,
  DataSourceListType,
  statusFormType,
  excelType,
  excelByIdType
}