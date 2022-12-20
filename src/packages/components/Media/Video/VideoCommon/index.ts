import image from '@/assets/img/bar.png';
import {
  ConfigType,
  PackagesCategoryEnum,
  ChartFrameEnum,
} from '@/packages/index.d';

export const VideoCommonConfig: ConfigType = {
  key: 'VideoCommon',
  chartKey: 'VVideoCommon',
  conKey: 'VCVideoCommon',
  dataKey: 'VDVideoCommon',
  title: '视频',
  category: 'Video',
  categoryName: '视频',
  package: PackagesCategoryEnum.MEDIA,
  chartFrame: ChartFrameEnum.COMMON,
  image,
};
