import Request from "../request/request";
import { DataSourceListType, checkDatasourceType, excelType } from '@/views/construction/types'


export class DataSource {
    //获取数据源列表
    static async getDatasourceList(params: DataSourceListType): Promise<any> {
        return Request("/rest/bi/getDatasourceList", {
            method: "get",
            responseType: "json",
            params: {
                ...params,
            },
        });
    }

    //数据库连接测试（添加数据源）
    static async checkDatasource(data: checkDatasourceType): Promise<any> {
        return Request("/rest/bi/checkDatasource", {
            method: "post",
            responseType: "json",
            data
        });
    }

    //保存数据源
    static async saveDatasource(data: checkDatasourceType): Promise<any> {
        return Request("/rest/bi/saveDatasource", {
            method: "post",
            responseType: "json",
            data
        });
    }

    //保存Excel数据数据源信息
    static async saveTemplateData(data: checkDatasourceType): Promise<any> {
        return Request("/rest/bi/saveTemplateData", {
            method: "post",
            responseType: "json",
            headers: {},
            data
        });
    }

    //获取Excel数据源数据
    static async getAllExcelDataByDataSourceId(params: checkDatasourceType): Promise<any> {
        return Request("/rest/bi/getAllExcelDataByDataSourceId", {
            method: "get",
            responseType: "json",
            params: {
                ...params,
            },
        });
    }

    //Excel文件上传/rest/bi/template/file
    static async uploadExcelFiles(data: any): Promise<any> {
        return Request("/rest/bi/template/file", {
            method: "post",
            responseType: "json",
            data
        });
    }

}

