import {
  echartOptionProfixHandle,
  PublicConfigClass,
} from '@/packages/hook/chart';
import { RingCommonConfig } from './index';
import { CreateComponentType } from '@/packages/index.d';
import cloneDeep from 'lodash/cloneDeep';
import dataJson from './data.json';
import { markRaw } from 'vue';

export const includes = ['legend', 'series'];
const themeColor = { color: 'customed' };
export const seriesItem = {
  type: 'pie',
  radius: [0, 75],
  label: {
    show: false,
    formatterOption: [],
    formatterArrange: 'left',
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  labelLayout: {
    align: 'left',
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
      color: '#ffffff',
      fontSize: 12,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
  },
  dataset: { ...dataJson },
  series: seriesItem,
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key = RingCommonConfig.key;
  public chartConfig = cloneDeep(RingCommonConfig);
  public option = echartOptionProfixHandle(option, includes);
  public themeColor = cloneDeep(markRaw(themeColor));
}
