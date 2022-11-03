import { ChartList, ChartGenreList } from '@/packages/components/Charts/index';
import {
  PackagesCategoryEnum,
  PackagesType,
  PackagesGenreType,
  ConfigType,
  FetchComFlagType,
} from '@/packages/index.d';

const configModules = import.meta.globEager('./components/**/config.vue');
const indexModules = import.meta.globEager('./components/**/index.vue');

// * 所有图表
export let packagesList: PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ChartList,
  [PackagesCategoryEnum.TEXT]: [],
  [PackagesCategoryEnum.MEDIA]: [],
  [PackagesCategoryEnum.MATERIAL]: [],
};

// * 所有图表(分类)
export let packagesGenreList: PackagesGenreType = {
  [PackagesCategoryEnum.CHARTS]: ChartGenreList,
  [PackagesCategoryEnum.TEXT]: {},
  [PackagesCategoryEnum.MEDIA]: {},
  [PackagesCategoryEnum.MATERIAL]: {},
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

/**
 * * 获取组件
 * @param {string} chartName 名称
 * @param {FetchComFlagType} flag 标识 0为展示组件, 1为配置组件
 */
const fetchComponent = (chartName: string, flag: FetchComFlagType) => {
  const module = flag === FetchComFlagType.VIEW ? indexModules : configModules;
  for (const key in module) {
    const urlSplit = key.split('/');
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