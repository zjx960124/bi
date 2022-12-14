import image from '@/assets/img/bar.png';
import {
  ConfigType,
  PackagesCategoryEnum,
  ChartFrameEnum,
} from '@/packages/index.d';
import { GenreEnum, GenreEnumName } from '../../index.d';

export const PieCommonConfig: ConfigType = {
  key: 'PieCommon',
  chartKey: 'VPieCommon',
  conKey: 'VCPieCommon',
  dataKey: 'VDPieCommon',
  title: '饼图',
  category: GenreEnum.DISTRIBUTION,
  categoryName: GenreEnumName.DISTRIBUTION,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image,
};
