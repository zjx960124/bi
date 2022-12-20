import { TextCommonConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';
import { PublicConfigClass } from '@/packages/hook/chart';
import { CreateComponentType } from '@/packages/index.d';

export const option = {
  main: '文本输入',
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontColor: '#ffffff',
  fontSize: 12,
  lineHeight: 1,
  letterSpacing: 1,
  background: '#ff0000',
  textAlign: 'left',
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key = TextCommonConfig.key;
  public chartConfig = cloneDeep(TextCommonConfig);
  public option = option;
}
