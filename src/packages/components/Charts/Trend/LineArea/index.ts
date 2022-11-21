import image from '@/assets/img/line.png';
import {
  ConfigType,
  PackagesCategoryEnum,
  ChartFrameEnum,
} from '@/packages/index.d';
import { GenreEnum, GenreEnumName } from '../../index.d';

export const LineAreaConfig: ConfigType = {
  key: 'LineArea',
  chartKey: 'VLineArea',
  conKey: 'VCLineArea',
  title: '折线面积图',
  category: GenreEnum.TREND,
  categoryName: GenreEnumName.TREND,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image,
};
