import image from '@/assets/img/bar.png';
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d';
import { GenreEnum, GenreEnumName } from '../../index.d';

export const TableCommonConfig: ConfigType = {
  key: 'TableCommon',
  chartKey: 'VTableCommon',
  conKey: 'VCTableCommon',
  title: '表格',
  category: GenreEnum.TABLE,
  categoryName: GenreEnumName.TABLE,
  package: PackagesCategoryEnum.CHARTS,
  image,
};
