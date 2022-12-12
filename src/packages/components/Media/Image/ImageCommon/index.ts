import image from '@/assets/img/bar.png';
import {
  ConfigType,
  PackagesCategoryEnum,
  ChartFrameEnum,
} from '@/packages/index.d';

export const ImageCommonConfig: ConfigType = {
  key: 'ImageCommon',
  chartKey: 'VImageCommon',
  conKey: 'VCImageCommon',
  dataKey: 'VDImageCommon',
  title: '图片',
  category: 'Image',
  categoryName: '图片',
  package: PackagesCategoryEnum.MEDIA,
  chartFrame: ChartFrameEnum.COMMON,
  image,
};
