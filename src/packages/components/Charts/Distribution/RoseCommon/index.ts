import image from '@/assets/img/bar.png';
import {
  ConfigType,
  PackagesCategoryEnum,
  ChartFrameEnum,
} from '@/packages/index.d';
import { GenreEnum, GenreEnumName } from '../../index.d';

export const RoseCommonConfig: ConfigType = {
  key: 'RoseCommon',
  chartKey: 'VRoseCommon',
  conKey: 'VCRoseCommon',
  dataKey: 'VDRoseCommon',
  title: '玫瑰图',
  category: GenreEnum.DISTRIBUTION,
  categoryName: GenreEnumName.DISTRIBUTION,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image,
};
