interface checkDatasourceType {
  dataSourceShowName?: string;
  ipContent?: string;
  port?: number | string;
  dataSourceName?: string | undefined;
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
  tableName?: string
}


interface dataTypes {
  type?: string;
  title?: string;
}

interface drawerTypes {
  type?: string
  drawer?: boolean,
  tableName?: string
}


//获取数据源列表
interface DataSourceListType {
  pageNum: number
  pageSize: number
  showName?: string
  accessType?: number
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


//根据id获取excel数据(分页)
interface excelByIdType {
  dataSourceId?: number
  pageNum: number
  pageSize: number
  counts?: number
}


//数据集-sql数据集
interface sqlItem {
  dataSourceId?: number | string | undefined | never
  id?: number
  tableName?: string | undefined | null | never
}

//数据集-新增数据集或者文件夹
interface addDataSetType {
  createTime?: string
  creator?: string,
  dataSetType?: number | string,
  datasourceId?: number | string,
  excelFileUrl?: string,
  id?: number | string,
  isDeleted?: number,
  isFileFolder?: number,
  name?: string,
  parentId?: number | string,
  sqlContent?: string,
  status?: number,
  tableName?: string,
  updateTime?: string,
  updater?: string
  dataSetDtos?:Array<addDataSetType>
}

//新增数据集-动态表头
interface headerType {
  fieldName?: string
  showName?: string
  minWidth?: number
}


//数据集列表页
interface ruleFormType {
  fileId?: Array<any>
  dataSetType?: string
  isFileFolder?: number | string | null | undefined
  options?: Array<any>
}

export {
  checkDatasourceType,
  dataTypes,
  drawerTypes,
  DataSourceListType,
  statusFormType,
  excelType,
  excelByIdType,
  sqlItem,
  headerType,
  addDataSetType,
  ruleFormType
}