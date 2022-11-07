import {
  ChartEditStoreType,
  ChartEditStorage,
} from './../chartEditStore/chartEditStore.d';
import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
type PageItem = ChartEditStoreType;
type PageList = {
  id: string;
  name: string;
  list: ChartEditStoreType[];
};

class pageEditClass {
  public pageList!: PageList;
  constructor() {
    this.pageList = {
      id: '测试',
      name: '测试',
      list: [],
    };
  }

  public getName() {
    return this.pageList.name;
  }

  public setPage(item: any) {
    this.pageList.list.push(item);
  }
}

const Project = new pageEditClass();

export default Project;
