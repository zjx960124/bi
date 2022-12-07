import image from '@/assets/img/bar.png';
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d';
import { GenreEnum, GenreEnumName } from '../../index.d';

export const NumberConfig: ConfigType = {
  key: 'Number',
  chartKey: 'VNumber',
  conKey: 'VCNumber',
  dataKey: 'VDNumber',
  title: '数字翻牌',
  category: GenreEnum.TARGET,
  categoryName: GenreEnumName.TARGET,
  package: PackagesCategoryEnum.CHARTS,
  image,
};
