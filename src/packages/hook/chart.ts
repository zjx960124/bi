import { toRefs } from 'vue';
import { PublicConfigType } from './../index.d';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import cloneDeep from 'lodash/cloneDeep';
import { globalThemeJson } from '@/settings/chartThemes/index';
import { getUUID } from '@/utils';
import { chartInitConfig } from '@/settings/designSetting';
import { ChartConfigType } from './../index.d';
import { graphic, LinearGradientObject } from 'echarts/core';
import { chartColors, ChartColorsNameType } from '@/settings/chartThemes/index';

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
 * 拓展seriesItem
 * @param option
 * @returns
 */
export const expendSeries = (
  option: ChartConfigType,
  theme?: {
    color: ChartColorsNameType;
  }
) => {
  // tool fill方法就连cloneDeep后的数据都指向最初的指针地址
  option.series = Array.from(
    new Array(option.dataset.dimensions.length - 1),
    () => cloneDeep(option.series)
  );
  theme && handleGradient(option.series, theme);
  return option;
};

export const handleGradient = (
  series: Array<{ [K in string]: any }>,
  theme: {
    color: ChartColorsNameType;
  }
) => {
  const gradient = series[0].areaStyle?.openOpacity;
  if (gradient) {
    series.forEach((item, index) => {
      item.areaStyle.color = new GraphicClass(
        0,
        0,
        0,
        1,
        chartColors[theme.color],
        item,
        index
      ).color;
    });
  } else {
    return false;
  }
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

// 16进制转rgba
export function hexToRgba(hex: string, opacity: number) {
  return `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt(
    '0x' + hex.slice(3, 5)
  )},${parseInt('0x' + hex.slice(5, 7))},${opacity})`;
}

type GradientColorStop = {
  offset: number;
  color: string;
};

// 处理渐变
export class GraphicClass {
  public color: LinearGradientObject;
  constructor(
    x: number,
    y: number,
    x2: number,
    y2: number,
    themeColor: { color: Array<string> },
    currentData: { [K in string]: any },
    indexs: number,
    globalCoord?: boolean | undefined
  ) {
    let gradient = [
      {
        offset: 0,
        color: hexToRgba(
          themeColor.color[indexs],
          currentData.areaStyle.opacity
        ),
      },
      {
        offset: 1,
        color: hexToRgba(themeColor.color[indexs], 0),
      },
    ];

    this.color = new graphic.LinearGradient(
      x,
      y,
      x2,
      y2,
      gradient,
      globalCoord
    );
  }
}
