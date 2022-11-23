/**
 * swagger数据转api的请求文件
 *
 * 用法：1.安装插件：npm install js-swagger2service-tool --save-dev
 *      2.执行代码：node swagger2api.js
 */
const Swagger2serviceTool = require('js-swagger2service-tool');
const { resolve } = require('path');

const swaggerUrl = 'http://192.168.1.101:10001/rest/bi/v2/api-docs'; // Swagger Api数据地址
const outputDir = resolve(__dirname, 'server');

const swagger2serviceTool = new Swagger2serviceTool({ url: swaggerUrl });
swagger2serviceTool.generateService({
  template: 'request', // 想要生成的 HTTP 客户端模板
  importText: `import Request from "../request/request";`, // 导入依赖的语句
  basePath: '/rest/bi', // 基础地址
  typescript: true, // 是否生成 ts 文件和类型
  outputDir, // 输出目录
});
