import Request from '../request/request';
import {
  ControllerResult,
  dataScreenParam,
  dataScreenListParam,
} from '@/views/analysis/types';

/**
 * 根据id删除大屏或仪表盘信息
 */
export function deleteDataScreen(data: {
  id: string;
}): Promise<ControllerResult<any>> {
  return Request({
    method: 'delete',
    url: `/deleteDataScreenById/${data.id}`,
  });
}

/**
 * 根据id查询大屏或仪表盘详情
 */
export function getDataScreenContent(params: {
  id: string;
}): Promise<ControllerResult<any>> {
  return Request({
    method: 'get',
    url: `/getDataScreenById/${params.id}`,
  });
}

/**
 * 分页查询数据列表
 */
export function getDataScreenList(
  pathVars: {
    category: number;
  },
  params: dataScreenListParam
): Promise<ControllerResult<any>> {
  return Request({
    method: 'GET',
    url: `/getDataScreenList/${pathVars.category}`,
    params: params,
  });
}

/**
 * 保存或者更新数据大屏信息
 */
export function saveOrUpdateDataScreen(
  data: dataScreenParam
): Promise<ControllerResult<any>> {
  return Request({
    method: 'POST',
    url: `/saveOrUpdateDataScreen`,
    data,
  });
}
