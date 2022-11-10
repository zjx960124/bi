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


export {
  sizeForm,
  dataTypes
}