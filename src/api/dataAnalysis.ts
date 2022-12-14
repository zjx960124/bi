import Request from '../request/request';
import {
  ControllerResult,
  dataScreenParam,
  dataScreenListParam,
  fileFoldParam,
} from '@/views/analysis/types';

/**
 * 根据id删除大屏或仪表盘信息
 */
export function deleteDataScreen(data: {
  id: string;
}): Promise<ControllerResult<any>> {
  return Request({
    method: 'delete',
    url: `/rest/bi/deleteDataScreenById/${data.id}`,
  });
}

/**
 * 根据id删除仪表盘文件夹信息
 */
export function deleteFileFoldById(data: {
  id: string;
}): Promise<ControllerResult<any>> {
  return Request({
    method: 'delete',
    url: `/rest/bi/deleteFileFoldById/${data.id}`,
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
    url: `/rest/bi/getDataScreenById/${params.id}`,
  });
}

/**
 * 查询所有仪表盘数据
 */
export function getAllScreenDataByFoldId(params: {
  name?: string;
}): Promise<ControllerResult<any>> {
  return Request({
    method: 'get',
    url: '/rest/bi/getAllScreenDataByFoldId',
    params: params,
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
    url: `/rest/bi/getDataScreenList/${pathVars.category}`,
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
    url: `/rest/bi/saveOrUpdateDataScreen`,
    data,
  });
}

/**
 * 新增文件夹
 */
export function saveFileFold(
  data: fileFoldParam
): Promise<ControllerResult<fileFoldParam>> {
  return Request({
    method: 'POST',
    url: `/rest/bi/addFileFold`,
    params: data,
  });
}

/**
 * 更新文件夹
 */
export function updateFileFold(
  data: fileFoldParam
): Promise<ControllerResult<fileFoldParam>> {
  return Request({
    method: 'PUT',
    url: `/rest/bi/updateFileFold`,
    params: data,
  });
}
