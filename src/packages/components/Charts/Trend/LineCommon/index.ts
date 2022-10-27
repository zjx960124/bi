import image from '@/assets/img/line.png';
import {
  ConfigType,
  PackagesCategoryEnum,
  ChartFrameEnum,
} from '@/packages/index.d';
import { GenreEnum, GenreEnumName } from '../../index.d';

export const LineCommonConfig: ConfigType = {
  key: 'LineCommon',
  chartKey: 'VLineCommon',
  conKey: 'VCLineCommon',
  title: '折线图',
  category: GenreEnum.TREND,
  categoryName: GenreEnumName.TREND,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image,
};
