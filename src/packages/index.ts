import { DashboardItem } from "./../types";
import { ChartList, ChartGenreList } from "@/packages/components/Charts/index";
import { TextList, TextGenreList } from "@/packages/components/Texts/index";
import { MediaList, MediaGenreList } from "@/packages/components/Media/index";
import {
  PackagesCategoryEnum,
  PackagesType,
  PackagesGenreType,
  ConfigType,
  FetchComFlagType,
  ChartFrameEnum,
  CreateComponentType,
} from "@/packages/index.d";
import type {
  GlobalThemeJsonType,
  ChartColorsNameType,
} from "@/settings/chartThemes/index";
import { useChartEditStore } from "@/store/chartEditStore/chartEditStore";
const chartEditStore = useChartEditStore();

const configModules = import.meta.globEager("./components/**/config.vue");
const indexModules = import.meta.globEager("./components/**/index.vue");
const dataModules = import.meta.globEager("./components/**/data.vue");

/**
 * 获取素材图片
 */
const getImage = (packages: string, name: string): string => {
  return new URL(`/src/assets/img/${packages}/${name}.png`, import.meta.url)
    .href;
};

const headerModules = Object.keys(
  import.meta.globEager("/src/assets/img/header/*.png")
);
const borderModules = Object.keys(
  import.meta.globEager("/src/assets/img/border/*.png")
);
const curofflineModules = Object.keys(
  import.meta.globEager("/src/assets/img/curoffline/*.png")
);

class BasicMaterial implements ConfigType {
  public key: string;
  public chartKey: string;
  public conKey: string;
  public dataKey: string;
  public title: string;
  public category: string;
  public categoryName: string;
  public package: string;
  public chartFrame?: ChartFrameEnum | undefined;
  public image: string | (() => Promise<typeof import("*.png")>);
  public images?: string | (() => Promise<typeof import("*.png")>) | undefined;
  constructor(
    image: string | (() => Promise<typeof import("*.png")>),
    category: string,
    title: string
  ) {
    this.key = "MaterialCommon";
    this.chartKey = "VMaterialCommon";
    this.conKey = "VCMaterialCommon";
    this.dataKey = "VDMaterialCommon";
    this.title = title;
    this.category = category;
    this.categoryName = "素材";
    this.package = "Material";
    this.chartFrame = ChartFrameEnum.COMMON;
    this.image = image;
    this.images = image;
  }
}

function collect() {
  let result = {
    Header: [] as ConfigType[],
    Border: [] as ConfigType[],
    Curoffline: [] as ConfigType[],
  };

  headerModules.forEach((item, index) => {
    const urlSplit = item.split("/");
    result.Header.push(
      new BasicMaterial(
        getImage("header", urlSplit[urlSplit.length - 2] + (index + 1)),
        "Header",
        `头部装饰${index + 1}`
      )
    );
  });
  borderModules.forEach((item, index) => {
    const urlSplit = item.split("/");
    result.Border.push(
      new BasicMaterial(
        getImage("border", urlSplit[urlSplit.length - 2] + (index + 1)),
        "Border",
        `区块边框${index + 1}`
      )
    );
  });
  curofflineModules.forEach((item, index) => {
    const urlSplit = item.split("/");
    result.Curoffline.push(
      new BasicMaterial(
        getImage("curoffline", urlSplit[urlSplit.length - 2] + (index + 1)),
        "Curoffline",
        `分割线${index + 1}`
      )
    );
  });
  return result;
}

const BaseMaterial = collect();

// * 所有图表
export let packagesList: PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ChartList,
  [PackagesCategoryEnum.TEXT]: TextList,
  [PackagesCategoryEnum.MEDIA]: MediaList,
  [PackagesCategoryEnum.MATERIAL]: [],
};

// * 所有图表(分类)
export let packagesGenreList: PackagesGenreType = {
  [PackagesCategoryEnum.CHARTS]: ChartGenreList,
  [PackagesCategoryEnum.TEXT]: TextGenreList,
  [PackagesCategoryEnum.MEDIA]: MediaGenreList,
  [PackagesCategoryEnum.MATERIAL]: BaseMaterial,
};

/**
 * * 获取目标组件配置信息
 * @param targetData
 */
export const createComponent = async (targetData: ConfigType) => {
  const { category, key } = targetData;
  const chart = await import(
    `./components/${targetData.package}/${category}/${key}/config.ts`
  );
  return new chart.default();
};

export type DashboardLayout = {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  resizable: boolean;
  draggable: boolean;
  static: boolean;
  id: string;
};

interface dashboardConfig extends CreateComponentType {
  layout: DashboardLayout;
  key: string;
  chartConfig: ConfigType;
  option: { [P in keyof GlobalThemeJsonType]?: GlobalThemeJsonType[P] };
  themeColor?: { color: ChartColorsNameType } & any;
}

/**
 * 获取仪表盘目标组件配置信息
 */
export const createDashboardComponent = async (targetData: ConfigType) => {
  const { category, key } = targetData;
  const chart = await import(
    `./components/${targetData.package}/${category}/${key}/config.ts`
  );
  const result: dashboardConfig = new chart.default();
  result.layout = chartEditStore.getCurrentLayout(result);
  result.card = {
    showMainTitle: true,
    mainTitleContent: "",
    mainTitleFontSize: 12,
    mainTitleFontColor: '#FFFFFF',
    mainTitleFontStyle: '',
    mainTitleFontWeight: '',
    showSubTItle: true,
    subTitleContent: '',
    showFootTitle: true,
    footTitleContent: '',
    customBack: true,
    customBackColor: '#FFFFFF',
    customBackRadius: 1
  };
  return result;
};

/**
 * * 获取组件
 * @param {string} chartName 名称
 * @param {FetchComFlagType} flag 标识 0为展示组件, 1为配置组件
 */
const fetchComponent = (chartName: string, flag: FetchComFlagType) => {
  const module =
    flag === FetchComFlagType.VIEW
      ? indexModules
      : flag === FetchComFlagType.CONFIG
      ? configModules
      : dataModules;
  for (const key in module) {
    const urlSplit = key.split("/");
    if (urlSplit[urlSplit.length - 2] === chartName) {
      return module[key];
    }
  }
};

/**
 * * 获取展示组件
 * @param {ConfigType} dropData 配置项
 */
export const fetchChartComponent = (dropData: ConfigType) => {
  const { key } = dropData;
  return fetchComponent(key, FetchComFlagType.VIEW)?.default;
};

/**
 * * 获取配置组件
 * @param {ConfigType} dropData 配置项
 */
export const fetchConfigComponent = (dropData: ConfigType) => {
  const { key } = dropData;
  return fetchComponent(key, FetchComFlagType.CONFIG)?.default;
};

/**
 * 获取数据组件
 * * @param {ConfigType} dropData 配置项
 */
export const fetchDataComponent = (dropData: ConfigType) => {
  const { key } = dropData;
  return fetchComponent(key, FetchComFlagType.DATA)?.default;
};
