import { ImageCommonConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';
import { PublicConfigClass } from '@/packages/hook/chart';
import { CreateComponentType } from '@/packages/index.d';

export const option = {
  src: '',
  url: '',
  backgroundColor: '',
  backgroundImage: '',
  backgroundImageType: 'image',
  objectFit: 'fill',
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key = ImageCommonConfig.key;
  public chartConfig = cloneDeep(ImageCommonConfig);
  public option = cloneDeep(option);
}
