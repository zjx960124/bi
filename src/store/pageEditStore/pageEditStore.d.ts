import { PageEditStoreType } from './../chartEditStore/chartEditStore.d';
import { HistoryItemType } from './../chartHistoryStore/chartHistoryStore.d';

// 页面实例类
export interface PageConfigType {
  id: string;
  name: string;
  component: PageEditStoreType;
  backStack: HistoryItemType[];
  forwardStack: HistoryItemType[];
}

export type PageConfigTypeList = Array<PageConfigType>;

export interface PageConfig {
  onShuffing: boolean;
  shuffingInterval: number;
  shuffingAnimation: string;
}

export interface ProductClass {
  setProjectName(T: string): void;
  getProjectName(): string;
  setComponent<T>(T: PageEditStoreType): void;
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
