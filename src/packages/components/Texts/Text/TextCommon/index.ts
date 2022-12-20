import image from '@/assets/img/bar.png';
import {
  ConfigType,
  PackagesCategoryEnum,
  ChartFrameEnum,
} from '@/packages/index.d';

export const TextCommonConfig: ConfigType = {
  key: 'TextCommon',
  chartKey: 'VTextCommon',
  conKey: 'VCTextCommon',
  dataKey: 'VDTextCommon',
  title: '文本输入',
  category: 'Text',
  categoryName: '文本',
  package: PackagesCategoryEnum.TEXT,
  chartFrame: ChartFrameEnum.COMMON,
  image,
};
