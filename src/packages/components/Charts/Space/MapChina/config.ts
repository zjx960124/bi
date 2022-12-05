import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public';
import { MapChinaConfig } from './index';
import { chartInitConfig } from '@/settings/designSetting';
import { CreateComponentType } from '@/packages/index.d';
import dataJson from './data.json';
import cloneDeep from 'lodash/cloneDeep';
import { markRaw } from 'vue';

export const includes = [];
const themeColor = { color: 'customed' };

export const option = {
  title: {
    show: true,
    text: '',
    subtext: '',
    textStyle: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
  },
  tooltip: {
    show: true,
    trigger: 'item',
  },
  geo: {
    show: false,
    type: 'map',
    roam: false,
    map: 'china',
    label: {
      normal: {
        show: false,
      },
      emphasis: {
        show: false,
      },
    },
    itemStyle: {
      normal: {
        areaColor: '#031525',
        borderColor: '#3B5077',
      },
      emphasis: {
        areaColor: '#2B91B7',
      },
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
  visualMapType: 'continuous',
  visualMap: {
    type: 'continuous',
    splitNumber: 5,
    show: true,
    dimension: 0,
    min: 0,
    max: 30000,
    calculable: true,
    inRange: {
      color: ['#0217F9', '#FF0000'],
    },
    textStyle: {
      color: '#ffffff',
    },
  },
  dataset: {
    source: dataJson,
  },
  series: [
    {
      name: '地图',
      type: 'map',
      map: 'china',
      zoom: 1, //缩放
      itemStyle: {
        // 背景色
        areaColor: 'rgba(117, 236, 170, 0.3)',
        emphasis: {
          areaColor: 'rgba(117, 236, 170, .8)',
          borderWidth: 1,
          shadowBlur: 10,
          shadowColor: '#75ecaa',
        },
        color: '#ffffff',
        borderColor: '#75ecaa',
        borderWidth: 1,
        showHainanIsLands: false, // 是否显示南海群岛
      },
      label: {
        show: true,
        color: '#ffffff',
        formatterOption: ['name', 'value'],
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 'normal',
      },
      // data: [
      //   {
      //     name: '福建省',
      //     value: 30000,
      //   },
      //   {
      //     name: '广东省',
      //     value: 24000,
      //   },
      // ],
    },
  ],
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key: string = MapChinaConfig.key;
  public attr = { ...chartInitConfig, w: 750, h: 800, zIndex: -1 };
  public chartConfig = MapChinaConfig;
  public option = echartOptionProfixHandle(option, includes);
  public themeColor = cloneDeep(markRaw(themeColor));
}
