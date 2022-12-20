import image from '@/assets/img/bar.png';
import {
  ConfigType,
  PackagesCategoryEnum,
  ChartFrameEnum,
} from '@/packages/index.d';
import { GenreEnum, GenreEnumName } from '../../index.d';

export const MapChinaConfig: ConfigType = {
  key: 'MapChina',
  chartKey: 'VMapChina',
  conKey: 'VCMapChina',
  dataKey: 'VDMapChina',
  title: '地图',
  category: GenreEnum.SPACE,
  categoryName: GenreEnumName.SPACE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image,
};
