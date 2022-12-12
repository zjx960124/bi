import { VideoCommonConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';
import { PublicConfigClass } from '@/packages/hook/chart';
import { CreateComponentType } from '@/packages/index.d';

export const option = {
  src: '',
  autoplay: true,
  muted: true,
  loop: true,
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key = VideoCommonConfig.key;
  public chartConfig = cloneDeep(VideoCommonConfig);
  public option = option;
}
