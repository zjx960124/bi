import image from '@/assets/img/bar.png';
import {
  ConfigType,
  PackagesCategoryEnum,
  ChartFrameEnum,
} from '@/packages/index.d';

export const ClockCommonConfig: ConfigType = {
  key: 'ClockCommon',
  chartKey: 'VClockCommon',
  conKey: 'VCClockCommon',
  dataKey: 'VDClockCommon',
  title: '时钟',
  category: 'Clock',
  categoryName: '时钟',
  package: PackagesCategoryEnum.MEDIA,
  chartFrame: ChartFrameEnum.COMMON,
  image,
};
