import cloneDeep from 'lodash/cloneDeep';
import { ChartEditStoreType } from './../chartEditStore/chartEditStore.d';
import { HistoryItemType } from './../chartHistoryStore/chartHistoryStore.d';
import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
import { useChartHistoryStore } from '@/store/chartHistoryStore/chartHistoryStore';
import { ref } from 'vue';

const chartHistoryStore = useChartHistoryStore();
const chartEditStore = useChartEditStore();

type PageItem = {
  id: string;
  name: string;
  component: ChartEditStoreType | {};
  backStack: HistoryItemType[];
  forwardStack: HistoryItemType[];
};

class pageEditClass {
  public projectName: string;
  public pageList!: Array<PageItem>;
  public currentPage!: PageItem;
  public basePage!: PageItem;
  public currentIndex: number;
  constructor() {
    this.projectName = '未命名大屏项目';
    this.pageList = [];
    this.basePage = this.currentPage = {
      id: '新建页面',
      name: '新建页面',
      component: {},
      backStack: [],
      forwardStack: [],
    };
    this.pageList.push(this.currentPage);
    this.currentIndex = 0;
  }

  public setName(name: string): void {
    this.projectName = name;
  }

  public getProjectName(): string {
    return this.projectName;
  }

  public setComponent(item: any) {
    this.currentPage.component = item;
  }

  public setStack() {}

  public getPageList() {
    return this.pageList;
  }

  public increasePage() {
    let backStack: Array<HistoryItemType> = chartHistoryStore.getBackStack;
    let forwardStack: Array<HistoryItemType> =
      chartHistoryStore.getForwardStack;
    chartHistoryStore.cleanStack();
    this.currentPage.backStack = backStack;
    this.currentPage.forwardStack = forwardStack;
    let component = chartEditStore.getStorageInfo;
    this.currentPage.component = component;
    chartEditStore.cleanStorageInfo();
    this.pageList[this.pageList.length - 1] = cloneDeep(this.currentPage);
    this.pageList.push((this.currentPage = this.basePage));
    this.currentIndex = this.pageList.length - 1;
  }

  public checkPage(index: number) {
    this.currentPage = this.pageList[index];
    console.log(this.currentPage);
    chartEditStore.cleanStorageInfo();
    chartEditStore.setStorageInfo(this.currentPage.component);
    chartHistoryStore.setStack(
      this.currentPage.backStack,
      this.currentPage.forwardStack
    );
    this.currentIndex = index;
  }
}

const Project = ref(new pageEditClass());

export default Project;
