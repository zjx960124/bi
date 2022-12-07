import image from '@/assets/img/bar.png';
import {
  ConfigType,
  PackagesCategoryEnum,
  ChartFrameEnum,
} from '@/packages/index.d';
import { GenreEnum, GenreEnumName } from '../../index.d';

export const RingCommonConfig: ConfigType = {
  key: 'RingCommon',
  chartKey: 'VRingCommon',
  conKey: 'VCRingCommon',
  dataKey: 'VDRingCommon',
  title: '环状图',
  category: GenreEnum.DISTRIBUTION,
  categoryName: GenreEnumName.DISTRIBUTION,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image,
};
