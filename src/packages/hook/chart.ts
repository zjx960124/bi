import { PublicConfigType } from './../index.d';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import { globalThemeJson } from '@/settings/chartThemes/index';
import { getUUID } from '@/utils';
import { chartInitConfig } from '@/settings/designSetting';

/**
 * * 合并 color 和全局配置项
 * @param option 配置
 * @param themeSetting 设置
 * @param excludes 排除元素
 * @returns object
 */
export const mergeTheme = <T, U>(
  option: T,
  themeSetting: U,
  includes: string[]
) => {
  return (option = merge({}, pick(themeSetting, includes), option));
};

/**
 * * ECharts option 统一前置处理
 * @param option
 * @return option
 */
export const echartOptionProfixHandle = (option: any, includes: string[]) => {
  option['backgroundColor'] = 'rgba(0,0,0,0)';
  return mergeTheme(option, globalThemeJson, includes);
};

// 单实例类
export class PublicConfigClass implements PublicConfigType {
  public id = getUUID();
  public isGroup = false;
  // 基本信息
  public attr = { ...chartInitConfig, zIndex: -1 };
  // 数据过滤
  public filter = undefined;

  // 设置坐标
  public setPosition(x: number, y: number): void {
    this.attr.x = x;
    this.attr.y = y;
  }
}
