import { PublicConfigClass } from '@/packages/public';
import { CreateComponentType } from '@/packages/index.d';
import { NumberConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';

export const option = {
  // 数据说明
  dataset: 100000,
  from: 0,
  dur: 3,
  precision: 0,
  showSeparator: true,
  numberSize: 34,
  numberColor: '#4a9ef8',
  numberFontStyle: 'normal',
  numberFontWeight: 'normal',
  letterSpacing: 1,
  showSlot: true,
  prefixText: '￥',
  prefixMargin: 0,
  suffixText: '元',
  suffixMargin: 0,
  slotSize: 18,
  slotColor: '#4a9ef8',
  slotFontStyle: 'normal',
  slotFontWeight: 'normal',
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key = NumberConfig.key;
  public chartConfig = cloneDeep(NumberConfig);
  public option = cloneDeep(option);

  constructor() {
    super();
    this.requestConfig.measureLength = 1;
  }
}
