import { ClockCommonConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';
import { PublicConfigClass } from '@/packages/hook/chart';
import { CreateComponentType } from '@/packages/index.d';

export const option = {
  main: '',
  time: '0',
  format: 'YYYY年M月D日 HH时mm分ss秒',
  fontColor: '#ffffff',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 'normal',
  lineHeight: 1,
  letterSpacing: 1,
  background: '#000000',
  textAlign: 'left',
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key = ClockCommonConfig.key;
  public chartConfig = cloneDeep(ClockCommonConfig);
  public option = cloneDeep(option);
}
