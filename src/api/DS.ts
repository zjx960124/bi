import Request from '../request/request';
import { HttpResponse } from '../types';

export class DSService {
  /**
   * 获取全部数据集列表
   * @param params 请求参数
   * @returns
   */
  static async getDSList(params?: Object): Promise<HttpResponse> {
    return Request('/rest/bi/getAllDataSet', {
      method: 'get',
      responseType: 'json',
      params: {
        ...params,
      },
    });
  }
  /** */
  static async getDSColumn(params: any): Promise<HttpResponse> {
    return Request(`/rest/bi/getDataSetColumnById/${params.dataSetColumnId}`, {
      method: 'get',
      responseType: 'json',
    });
  }
  /**
   * 组件获取数据
   */
  static async getComponentData(data: any): Promise<HttpResponse> {
    return Request('/rest/bi/getReturnData', {
      method: 'post',
      responseType: 'json',
      data,
    });
  }
  /**
   * 保存数据大屏
   */
  static async saveScreen(data: any): Promise<HttpResponse> {
    return Request('/rest/bi/saveOrUpdateDataScreen', {
      method: 'post',
      responseType: 'json',
      data,
    });
  }
}
