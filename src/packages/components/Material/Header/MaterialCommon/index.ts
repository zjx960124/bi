import {
  ConfigType,
  PackagesCategoryEnum,
  ChartFrameEnum,
} from '@/packages/index.d';

// @ts-ignore
export const MaterailCommonConfig: ConfigType = {
  key: 'MaterialCommon',
  chartKey: 'VMaterialCommon',
  conKey: 'VCMaterialCommon',
  dataKey: 'VDMaterialCommon',
  title: '素材',
  category: 'Common',
  categoryName: '素材',
  package: 'Material',
  chartFrame: ChartFrameEnum.COMMON,
};
