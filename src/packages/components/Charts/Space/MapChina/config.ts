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
  dataset: dataJson,
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
    min: 0,
    max: 400,
    inRange: {
      color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
    },
  },
  series: [
    {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      symbolSize: 6,
      zlevel: 1,
      label: {
        show: false,
      },
      itemStyle: {
        shadowBlur: 10,
        color: '#00ECC8',
      },
      data: [],
    },
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
      data: [],
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
