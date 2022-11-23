import image from '@/assets/img/bar.png';
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d';
import { GenreEnum, GenreEnumName } from '../../index.d';

export const ProcessCommonConfig: ConfigType = {
  // 唯一key
  key: 'ProcessCommon',
  // 图表组件渲染 Components 格式: V + key
  chartKey: 'VProcessCommon',
  // 配置组件渲染 Components 格式: VC + key
  conKey: 'VCProcessCommon',
  // 名称
  title: '进度条',
  // 子分类目录
  category: GenreEnum.TARGET,
  // 子分类目录
  categoryName: GenreEnumName.TARGET,
  // 包分类
  package: PackagesCategoryEnum.CHARTS,
  // 图片
  image: image,
};
