import {
  GenreEnum,
  GenreEnumName,
  fieldEnum,
  fieldEnumName,
} from './components/Charts/index.d';
import type {
  GlobalThemeJsonType,
  ChartColorsNameType,
} from '@/settings/chartThemes/index';

// 组件配置
export type ConfigType = {
  key: string;
  chartKey: string;
  conKey: string;
  title: string;
  category: string;
  categoryName: string;
  package: string;
  chartFrame?: ChartFrameEnum;
  image: string | (() => Promise<typeof import('*.png')>);
};

// 包分类枚举
export enum PackagesCategoryEnum {
  CHARTS = 'Charts',
  TEXT = 'Text',
  MEDIA = 'Media',
  MATERIAL = 'Material',
}

// 包分类名称
export enum PackagesCategoryName {
  CHARTS = '图表',
  TEXT = '文本',
  MEDIA = '媒体',
  MATERIAL = '素材',
}

// 图表包类型
export type PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ConfigType[];
  [PackagesCategoryEnum.TEXT]?: ConfigType[];
  [PackagesCategoryEnum.MEDIA]?: ConfigType[];
  [PackagesCategoryEnum.MATERIAL]?: ConfigType[];
};

export type GenreConfigType = {
  key: string;
  label: string;
  list: ConfigType[];
};

// export type GenreType = {
//   [GenreEnum.COMPARE]?: ConfigType[];
//   [GenreEnum.TREND]?: ConfigType[];
//   [GenreEnum.TABLE]?: ConfigType[];
//   [GenreEnum.TARGET]?: ConfigType[];
//   [GenreEnum.DISTRIBUTION]?: ConfigType[];
//   [GenreEnum.SPACE]?: ConfigType[];
// };

export type GenreType = {
  [GenreEnum.COMPARE]?: GenreConfigType;
  [GenreEnum.TREND]?: GenreConfigType;
  [GenreEnum.TABLE]?: GenreConfigType;
  [GenreEnum.TARGET]?: GenreConfigType;
  [GenreEnum.DISTRIBUTION]?: GenreConfigType;
  [GenreEnum.SPACE]?: GenreConfigType;
};

export type PackagesGenreType = {
  [PackagesCategoryEnum.CHARTS]?: GenreType;
  [PackagesCategoryEnum.TEXT]?: GenreType;
  [PackagesCategoryEnum.MEDIA]?: GenreType;
  [PackagesCategoryEnum.MATERIAL]?: GenreType;
};

// 获取组件
export enum FetchComFlagType {
  VIEW,
  CONFIG,
}

export enum ChartFrameEnum {
  // 支持 dataset 的 echarts 框架
  ECHARTS = 'echarts',
  // UI 组件框架
  NAIVE_UI = 'naiveUI',
  // 自定义带数据组件
  COMMON = 'common',
  // 无数据变更
  STATIC = 'static',
}

// 滤镜/变换枚举
export enum FilterEnum {
  // 是否启用
  FILTERS_SHOW = 'filterShow',

  // 透明度
  OPACITY = 'opacity',
  // 饱和度
  SATURATE = 'saturate',
  // 对比度
  CONTRAST = 'contrast',
  // 色相
  HUE_ROTATE = 'hueRotate',
  // 亮度
  BRIGHTNESS = 'brightness',

  // 旋转
  ROTATE_Z = 'rotateZ',
  ROTATE_X = 'rotateX',
  ROTATE_Y = 'rotateY',

  // 倾斜
  SKEW_X = 'skewX',
  SKEW_Y = 'skewY',
}

export interface PublicRequestType {
  DSID: string | number;
  dimension: fieldItem[];
  measure: fieldItem[];
}

export interface fieldItem {
  [fieldEnum.columnName]: string;
  [fieldEnum.dataSetColumnName]: string;
  [fieldEnum.setDataType]: number;
  [fieldEnum.originDataType]: number;
  [fieldEnum.dataSetId]: number;
  [fieldEnum.commentComment]: string;
  [fieldEnum.columnType]?: number;
  dataReturnMethod?: number;
  combinationMode?: number;
}

export interface DSResponseType {
  id: number;
  setDataType: number;
  columnName: string;
}

// 组件实例类
export interface PublicConfigType {
  id: string;
  isGroup: boolean;
  attr: {
    x: number;
    y: number;
    w: number;
    h: number;
    zIndex: number;
    offsetX: number;
    offsetY: number;
  };
  filter?: string;
  setPosition: Function;
  requestConfig: PublicRequestType;
}

export interface CreateComponentType extends PublicConfigType {
  key: string;
  chartConfig: ConfigType;
  option: { [P in keyof GlobalThemeJsonType]?: GlobalThemeJsonType[P] };
  themeColor?: { color: ChartColorsNameType } & any;
}

// 组件成组实例类
export interface CreateComponentGroupType extends CreateComponentType {
  groupList: Array<CreateComponentType>;
}

// 获取组件实例类中某个key对应value类型的方法
export type PickCreateComponentType<T extends keyof CreateComponentType> = Pick<
  CreateComponentType,
  T
>[T];

export type ChartConfigType = GlobalThemeJsonType;
