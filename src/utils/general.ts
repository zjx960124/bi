import {
  RequestHttpIntervalEnum,
  RequestParamsObjType,
} from '@/enums/httpEnum';
import { PageConfig } from '@/store/pageEditStore/pageEditStore';
import cloneDeep from 'lodash/cloneDeep';
import { isNumber, isObject } from './is';
import { h } from 'vue';
import { NIcon } from 'naive-ui';

/**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export const getUUID = (randomLength = 10) => {
  return Number(
    Math.random().toString().substr(2, randomLength) + Date.now()
  ).toString(36);
};

// * 开启加载
export const loadingStart = () => {
  // window['$loading'].start();
};

// * 加载结束
export const loadingFinish = () => {
  // setTimeout(() => {
  //   // window['$loading'].finish();
  // });
};

// * 加载错误
export const loadingError = () => {
  // setTimeout(() => {
  //   window['$loading'].error();
  // });
};

/**
 * * 判断是否是预览页
 * @returns boolean
 */
export const isPreview = () => {
  return document.location.hash.includes('preview');
};

export const toString = (str: any) => {
  return isNumber(str) ? `${str}` : isObject(str) ? JSON.stringify(str) : str;
};

/**
 * * 函数过滤器
 * @param data 数据值
 * @param funcStr 函数字符串
 * @param toString 转为字符串
 * @param errorCallBack 错误回调函数
 * @param successCallBack 成功回调函数
 * @returns
 */
export const newFunctionHandle = (
  data: any,
  funcStr?: string,
  isToString?: boolean,
  errorCallBack?: Function,
  successCallBack?: Function
) => {
  try {
    if (!funcStr) return data;
    const fn = new Function('data', funcStr);
    const fnRes = fn(cloneDeep(data));
    const resHandle = isToString ? toString(fnRes) : fnRes;
    // 成功回调
    successCallBack && successCallBack(resHandle);
    return resHandle;
  } catch (error) {
    // 失败回调
    errorCallBack && errorCallBack(error);
    return '函数执行错误';
  }
};

/**
 * * 处理请求事件单位
 * @param num 时间间隔
 * @param unit RequestHttpIntervalEnum
 * @return number 秒数
 */
export const intervalUnitHandle = (
  num: number,
  unit: RequestHttpIntervalEnum
) => {
  switch (unit) {
    // 秒
    case RequestHttpIntervalEnum.SECOND:
      return num * 1000;
    // 分
    case RequestHttpIntervalEnum.MINUTE:
      return num * 1000 * 60;
    // 时
    case RequestHttpIntervalEnum.HOUR:
      return num * 1000 * 60 * 60;
    // 天
    case RequestHttpIntervalEnum.DAY:
      return num * 1000 * 60 * 60 * 24;
    default:
      return num * 1000;
  }
};

/**
 * * render 图标
 *  @param icon 图标
 *  @param set 设置项
 */
export const renderIcon = (icon: any, set = {}) => {
  return () => h(NIcon, set, { default: () => h(icon) });
};

/**
 * * file转url
 */
export const fileToUrl = (file: File): string => {
  const Url = URL || window.URL || window.webkitURL;
  const ImageUrl = Url.createObjectURL(file);
  return ImageUrl;
};

// * 动画
export const animationsClass = (pageConfig: PageConfig) => {
  if (pageConfig.onShuffing) {
    return `animate__animated  animate__${pageConfig.shuffingAnimation}`;
  }
  return '';
};
