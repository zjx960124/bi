import { MaterailCommonConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';
import { PublicConfigClass } from '@/packages/hook/chart';
import { CreateComponentType } from '@/packages/index.d';

export const option = {
  src: '',
  url: '',
  backgroundColor: '',
  backgroundImage: '',
  backgroundImageType: 'url',
  objectFit: 'contain',
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key = MaterailCommonConfig.key;
  public chartConfig = cloneDeep(MaterailCommonConfig);
  public option = cloneDeep(option);
}
