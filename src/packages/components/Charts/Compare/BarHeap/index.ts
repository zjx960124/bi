import image from '@/assets/img/bar.png';
import {
  ConfigType,
  PackagesCategoryEnum,
  ChartFrameEnum,
} from '@/packages/index.d';
import { GenreEnum, GenreEnumName } from '../../index.d';

export const BarHeapConfig: ConfigType = {
  key: 'BarHeap',
  chartKey: 'VBarHeap',
  conKey: 'VCBarHeap',
  title: '堆积柱状图',
  category: GenreEnum.COMPARE,
  categoryName: GenreEnumName.COMPARE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image,
};
