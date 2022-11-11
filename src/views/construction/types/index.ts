interface sizeForm {
  name?: string;
  url?: string;
  port?: number;
  databases?: string;
  username?: string;
  password?: string;
  fileName?: string
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


export {
  sizeForm,
  dataTypes,
  drawerTypes,
  datasourceType
}