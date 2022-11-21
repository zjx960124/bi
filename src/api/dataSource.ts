import Request from "../request/request";
import { HttpResponse } from '../types'
import { DataSourceListType, checkDatasourceType } from '@/views/construction/types'


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
}

