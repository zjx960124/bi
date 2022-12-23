import Request from '../request/request';
import {
  DataSourceListType,
  checkDatasourceType,
  excelByIdType,
} from '@/views/construction/types';

export class DataSource {
  //获取数据源列表
  static async getDatasourceList(params: DataSourceListType): Promise<any> {
    return Request('/rest/bi/getDatasourceList', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params,
      },
    });
  }

  //数据库连接测试（添加数据源）
  static async checkDatasource(data: checkDatasourceType): Promise<any> {
    return Request('/rest/bi/checkDatasource', {
      method: 'post',
      responseType: 'json',
      data,
    });
  }

  //保存数据源
  static async saveDatasource(data: checkDatasourceType): Promise<any> {
    return Request('/rest/bi/saveDatasource', {
      method: 'post',
      responseType: 'json',
      data,
    });
  }

  //保存Excel数据数据源信息
  static async saveTemplateData(data: checkDatasourceType): Promise<any> {
    return Request('/rest/bi/saveTemplateData', {
      method: 'post',
      responseType: 'json',
      headers: {},
      data,
    });
  }

  //获取Excel数据源数据
  static async getAllExcelDataByDataSourceId(
    params: excelByIdType
  ): Promise<any> {
    return Request(
      `/rest/bi/getAllExcelDataByDataSourceId/${params.dataSourceId}`,
      {
        method: 'get',
        responseType: 'json',
        params: {
          pageNum: params.pageNum,
          pageSize: params.pageSize,
        },
      }
    );
  }

  //Excel文件上传
  static async uploadExcelFiles(data: any): Promise<any> {
    return Request('/rest/bi/template/file', {
      method: 'post',
      responseType: 'json',
      headers: {
        'Content-Type':
          'multipart/form-data;boundary=ebf9f03029db4c2799ae16b5428b06bd1',
      },
      data,
    });
  }

  //删除数据源根据id
  static async deleteDatasource(params: any): Promise<any> {
    return Request(`/rest/bi/deleteDatasource/${params.datasourceId}`, {
      method: 'DELETE',
      responseType: 'json',
    });
  }

  //根据id更新数据源
  static async updateDatasource(params: any): Promise<any> {
    return Request(`/rest/bi/updateDatasource`, {
      method: 'put',
      responseType: 'json',
      data: params,
    });
  }
  //根据id查询数据源
  static async getDataSourceById(params: checkDatasourceType): Promise<any> {
    return Request(`/rest/bi/getDataSourceById/${params.dataSourceId}`, {
      method: 'get',
      responseType: 'json',
    });
  }

  //根据数据源信息查询表信息
  static async getTableByDataSourceId(params: any): Promise<any> {
    return Request(`/rest/bi/getTableByDataSourceId/${params.dataSourceId}`, {
      method: 'get',
      responseType: 'json',
      params: {
        pageNum: params.pageNum,
        pageSize: params.pageSize,
      },
    });
  }
  //根据数据源id与表信息名称查询字段信息
  static async getColumnByTableId(params: any): Promise<any> {
    return Request(
      `/rest/bi/getColumnByTableId/${params.tableName}/${params.dataSourceId}`,
      {
        method: 'get',
        responseType: 'json',
        params: {
          pageNum: params.pageNum,
          pageSize: params.pageSize,
        },
      }
    );
  }
  //根据数据源信息删除数据
  static async deleteFileDataByDataSourceIdAndDataId(
    params: any
  ): Promise<any> {
    return Request(
      `/rest/bi/deleteFileDataByDataSourceIdAndDataId/${params.dataSourceId}/${params.dataId}`,
      {
        method: 'DELETE',
        responseType: 'json',
      }
    );
  }

  //增加数据
  static async addExcelData(params: any): Promise<any> {
    return Request(`/rest/bi/addExcelData`, {
      method: 'get',
      responseType: 'json',
      params,
    });
  }
}
