import cloneDeep from 'lodash/cloneDeep';
import { ChartEditStoreType } from './../chartEditStore/chartEditStore.d';
import { HistoryItemType } from './../chartHistoryStore/chartHistoryStore.d';
import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
import { useChartHistoryStore } from '@/store/chartHistoryStore/chartHistoryStore';
import { ref } from 'vue';
import { defaultTheme, globalThemeJson } from '@/settings/chartThemes/index';
import { previewScaleType } from '@/settings/designSetting';
import { getUUID } from '@/utils';

const chartHistoryStore = useChartHistoryStore();
const chartEditStore = useChartEditStore();

function createBasePage() {
  return {
    id: '新建页面',
    name: '新建页面',
    component: {
      componentList: [],
      editCanvasConfig: {
        // 默认宽度
        width: 1920,
        // 默认高度
        height: 1080,
        // 启用滤镜
        filterShow: false,
        // 色相
        hueRotate: 0,
        // 饱和度
        saturate: 1,
        // 对比度
        contrast: 1,
        // 亮度
        brightness: 1,
        // 透明度
        opacity: 1,
        // 变换（暂不更改）
        rotateZ: 0,
        rotateX: 0,
        rotateY: 0,
        skewX: 0,
        skewY: 0,
        // 默认背景色
        backgroundType: 'background',
        background: '#000000',
        backgroundImage: undefined,
        // 是否使用纯颜色
        selectColor: true,
        // chart 主题色
        chartThemeColor: defaultTheme || 'dark',
        // 全局配置
        chartThemeSetting: globalThemeJson,
        // 预览方式
        previewScaleType: previewScaleType,
      },
    },
    backStack: [],
    forwardStack: [],
  };
}

export type PageItem = {
  id: string;
  name: string;
  component: ChartEditStoreType | {};
  backStack: HistoryItemType[];
  forwardStack: HistoryItemType[];
};

export type PageConfig = {
  onShuffing: boolean;
  shuffingInterval: number;
  shuffingAnimation: string;
};

class pageEditClass {
  public projectName: string;
  public pageList!: Array<PageItem>;
  public currentPage!: PageItem;
  public basePage!: PageItem;
  public currentIndex: number;
  public id: string;
  public pageAnimation!: string | null;
  public pageConfig!: PageConfig;
  constructor() {
    this.id = getUUID();
    this.projectName = '未命名大屏项目';
    this.pageConfig = {
      onShuffing: true,
      shuffingInterval: 5,
      shuffingAnimation: 'fadeInRight',
    };
    this.pageList = [];
    this.basePage = createBasePage();
    this.currentPage = createBasePage();
    this.pageList.push(this.currentPage);
    this.currentIndex = 0;
  }

  public setProjectName(name: string): void {
    this.projectName = name;
  }

  public getProjectName(): string {
    return this.projectName;
  }

  public setComponent(item: ChartEditStoreType) {
    this.currentPage.component = item;
  }

  public getProjectInfo() {
    let component = chartEditStore.getStorageInfo;
    this.currentPage.component = component;
    this.pageList[this.currentIndex] = cloneDeep(this.currentPage);
    return {
      id: this.id,
      name: this.projectName,
      pageConfig: this.pageConfig,
      list: this.pageList,
    };
  }

  public setStack() {}

  public setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

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
    this.pageList.push(createBasePage());
    this.currentPage = createBasePage();
    this.currentIndex = this.pageList.length - 1;
  }

  public checkPage(index: number) {
    if (index === this.currentIndex) return false;
    this.currentPage = this.pageList[index];
    chartEditStore.cleanStorageInfo();
    chartEditStore.setStorageInfo(this.currentPage.component);
    chartHistoryStore.setStack(
      this.currentPage.backStack,
      this.currentPage.forwardStack
    );
    this.currentIndex = index;
  }

  public deletePage(index: number) {
    if (index === 0 && this.pageList.length === 1) {
      this.resetPage(index);
      return;
    }
    if (index === this.currentIndex) {
      this.pageList.splice(index, 1);
      this.checkPage(index - 1);
      return;
    }
  }

  public resetPage(index: number) {
    this.pageList.splice(index, 1, createBasePage());
    chartEditStore.cleanStorageInfo();
    chartHistoryStore.cleanStack();
  }
}

const Project = ref(new pageEditClass());

export default Project;
