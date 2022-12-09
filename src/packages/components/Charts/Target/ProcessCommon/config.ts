import { PublicConfigClass } from '@/packages/public';
import { CreateComponentType } from '@/packages/index.d';
import { ProcessCommonConfig } from './index';
import { chartInitConfig } from '@/settings/designSetting';
import cloneDeep from 'lodash/cloneDeep';

export const types = [
  {
    label: '线形',
    value: 'line',
  },
  {
    label: '圆形',
    value: 'circle',
  },
  {
    label: '仪表盘',
    value: 'dashboard',
  },
];

export const indicatorPlacements = [
  {
    label: '内部',
    value: 'inside',
  },
  {
    label: '外部',
    value: 'outside',
  },
];

export const option = {
  dataset: 36,
  // 默认类型
  type: 'line',
  height: 24,
  // 主颜色
  color: '#4992FFFF',
  // 轨道颜色
  railColor: '#3e3e3f',
  // 指标
  unit: '%',
  // 指标大小
  indicatorTextSize: 34,
  // 指标位置（线条时可用）
  indicatorPlacement: 'inside',
  precision: 0,
  // 指标颜色
  indicatorTextColor: '#FFFFFF',
  indicatorFontWeight: 'normal',
  indicatorFontStyle: 'normal',
  // 偏移角度
  offsetDegree: 0,
  fillBorderRadius: 12,
  animationFlag: true,
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key = ProcessCommonConfig.key;
  public attr = { ...chartInitConfig, zIndex: -1 };
  public chartConfig = cloneDeep(ProcessCommonConfig);
  public option = cloneDeep(option);

  constructor() {
    super();
    this.requestConfig.dataType = 1;
    this.requestConfig.data = '';
    this.requestConfig.measureLength = 1;
  }
}
