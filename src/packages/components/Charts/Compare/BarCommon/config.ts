import {
  echartOptionProfixHandle,
  PublicConfigClass,
} from '@/packages/hook/chart';
import { BarCommonConfig } from './index';
import { CreateComponentType } from '@/packages/index.d';
import cloneDeep from 'lodash/cloneDeep';
import dataJson from './data.json';

export const includes = ['legend', 'xAxis', 'yAxis'];

export const seriesItem = {
  type: 'bar',
  barWidth: null,
  itemStyle: {
    color: null,
    borderRadius: 0,
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
    textStyle: {
      color: '#333333',
      fontSize: 12,
      fontWeight: 'normal',
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
    },
  },
  yAxis: {
    show: true,
    type: 'value',
  },
  dataset: { ...dataJson },
  series: [seriesItem, seriesItem],
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key = BarCommonConfig.key;
  public chartConfig = cloneDeep(BarCommonConfig);
  public option = echartOptionProfixHandle(option, includes);
}
