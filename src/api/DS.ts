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
}
