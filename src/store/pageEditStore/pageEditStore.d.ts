import { ChartEditStoreType } from './../chartEditStore/chartEditStore.d';
import { HistoryItemType } from './../chartHistoryStore/chartHistoryStore.d';

// 页面实例类
export interface PageConfigType {
  id: string;
  name: string;
  component: ChartEditStoreType;
  backStack: HistoryItemType[];
  forwardStack: HistoryItemType[];
}

export interface PageConfigTypeList {
  [index: number]: PageConfigType;
}

export interface PageConfig {
  onShuffing: boolean;
  shuffingInterval: number;
  shuffingAnimation: string;
}

export interface ProductClass {
  setProjectName(): void;
  getProjectName(): string;
  setComponent<T>(T: ChartEditStoreType): void;
}

export interface BaseProductType extends ProductClass {
  projectName: string;
  pageList: PageConfigTypeList;
  currentPage: PageConfigType;
  basePage: PageConfigType;
  currentIndex: number;
  id: string;
  pageConfig: PageConfig;
}
