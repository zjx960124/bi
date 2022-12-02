import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public';
import { LineCommonConfig } from './index';
import { CreateComponentType } from '@/packages/index.d';
import dataJson from './data.json';
import cloneDeep from 'lodash/cloneDeep';
import { markRaw } from 'vue';

export const includes = ['legend', 'xAxis', 'yAxis'];
const themeColor = { color: 'customed' };
export const seriesItem = {
  type: 'line',
  smooth: false,
  showSymbol: false,
  symbol: 'emptyCircle',
  symbolSize: 10,
  lineStyle: {
    type: 'solid',
    width: 3,
    itemStyle: {
      color: null,
      borderRadius: 0,
    },
  },
  label: {
    show: false,
    position: 'top',
    fontSize: 12,
    color: '#ffffff',
    fontStyle: 'normal',
  },
  areaStyle: {
    opacity: 0,
  },
};

export const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'line',
    },
  },
  legend: {
    show: true,
    top: '5%',
    textStyle: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
  },
  xAxis: {
    show: true,
    type: 'category',
    nameLocation: 'center',
    nameGap: 30,
    nameTextStyle: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#6D79FF',
        type: 'solid',
        width: 1,
      },
    },
  },
  yAxis: {
    show: true,
    type: 'value',
    nameLocation: 'center',
    nameGap: 30,
    nameTextStyle: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    axisLabel: {
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#6D79FF',
        type: 'solid',
        width: 1,
      },
    },
  },
  exhibition: 'vertical',
  dataset: {
    source: dataJson,
  },
  series: seriesItem,
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key: string = LineCommonConfig.key;
  public chartConfig = LineCommonConfig;
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes);
  public themeColor = cloneDeep(markRaw(themeColor));
}
