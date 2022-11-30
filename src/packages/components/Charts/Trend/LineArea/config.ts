import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public';
import { LineAreaConfig } from './index';
import { CreateComponentType } from '@/packages/index.d';
import dataJson from './data.json';
import cloneDeep from 'lodash/cloneDeep';
import { markRaw } from 'vue';

export const includes = ['legend', 'xAxis', 'yAxis'];
const themeColor = { color: 'customed' };
export const seriesItem = {
  type: 'line',
  smooth: false,
  showSymbol: true,
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
    show: true,
    position: 'top',
    fontSize: 24,
    color: '#ffffff',
    fontStyle: 'normal',
  },
  areaStyle: {
    openOpacity: true,
    opacity: 1,
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
      color: '#333333',
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
  dataset: { ...dataJson },
  series: seriesItem,
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key: string = LineAreaConfig.key;
  public chartConfig = LineAreaConfig;
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes);
  public themeColor = cloneDeep(markRaw(themeColor));
}
