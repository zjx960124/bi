import { PublicConfigClass } from '@/packages/public';
import { CreateComponentType } from '@/packages/index.d';
import { TableCommonConfig } from './index';
import cloneDeep from 'lodash/cloneDeep';
import dataset from './data.json';

const option = {
  dataset,
  columns: [],
  data: [],
  tableAlign: 'center',
  pageSize: 5,
  backgroundColor: '#0011FF',
  stripe: false,
  stripeColor: '',
  border: true,
  borderHeight: 1,
  borderColor: '#FF0000',
  splitLine: false,
  splitLineHeight: 1,
  splitLineColor: '#FF0000',
  fontSize: 12,
  fontColor: '#FF0000',
  fontStyle: 'normal',
  fontWeight: 'normal',
  headerFlag: true,
  headerFontSize: 12,
  headerFontColor: '#000000',
  headerBackgroundColor: '#FF0000',
  headerFontStyle: 'normal',
  headerFontWeight: 'normal',
  indexColumn: true,
  indexColumnLabel: '序号',
  indexColumnWidth: 50,
};

export default class Config
  extends PublicConfigClass
  implements CreateComponentType
{
  public key = TableCommonConfig.key;
  public chartConfig = cloneDeep(TableCommonConfig);
  public option = cloneDeep(option);
}
