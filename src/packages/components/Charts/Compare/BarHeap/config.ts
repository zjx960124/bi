import {
  echartOptionProfixHandle,
  PublicConfigClass,
} from '@/packages/hook/chart';
import { BarHeapConfig } from './index';
import { CreateComponentType } from '@/packages/index.d';
import cloneDeep from 'lodash/cloneDeep';
import dataJson from './data.json';
import { markRaw } from 'vue';

export const includes = ['legend', 'xAxis', 'yAxis', 'series'];
const themeColor = { color: 'customed' };
export const seriesItem = {
  type: 'bar',
  barWidth: 20,
  stack: 'series',
  itemStyle: {
    color: null,
    borderRadius: [0, 0, 0, 0],
  },
  label: {
    show: false,
    position: 'top',
    fontSize: 12,
    color: '#333333',
    fontStyle: 'normal',
  },
};

export const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      show: true,
      type: 'shadow',
    },
  },
  legend: {
    show: true,
    top: '5%',
    legendPosition: 'top',
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
      color: '#333333',
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
  yAxis: {
    show: true,
    type: 'value',
    nameLocation: 'center',
    nameGap: 30,
    nameTextStyle: {
      color: '#333333',
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
  dataset: { ...dataJson },
  series: seriesItem,
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key = BarHeapConfig.key;
  public chartConfig = cloneDeep(BarHeapConfig);
  public option = echartOptionProfixHandle(option, includes);
  public themeColor = cloneDeep(markRaw(themeColor));
}