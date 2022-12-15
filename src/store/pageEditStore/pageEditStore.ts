import cloneDeep from 'lodash/cloneDeep';
import { ChartEditStoreType } from './../chartEditStore/chartEditStore.d';
import { HistoryItemType } from './../chartHistoryStore/chartHistoryStore.d';
import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
import { useChartHistoryStore } from '@/store/chartHistoryStore/chartHistoryStore';
import { ref, reactive, Ref } from 'vue';
import { defaultTheme, globalThemeJson } from '@/settings/chartThemes/index';
import { previewScaleType } from '@/settings/designSetting';
import { getUUID } from '@/utils';
import type { ChartColorsNameType } from '@/settings/chartThemes/index';
import {
  BaseProductType,
  PageConfigTypeList,
  PageConfigType,
} from './pageEditStore.d';

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
        chartThemeColor: 'dark' as ChartColorsNameType,
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

class pageEditClass implements BaseProductType {
  public projectName: string;
  public pageList!: PageConfigTypeList;
  public currentPage!: PageConfigType;
  public basePage!: PageConfigType;
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
    this.trackData(this.pageList.length - 1);
    this.pageList.push(createBasePage());
    this.currentPage = createBasePage();
    this.currentIndex = this.pageList.length - 1;
    // this.currentPage = this.pageList[this.currentIndex];
  }

  public checkPage(index: number) {
    if (index === this.currentIndex) return false;
    // 收集数据
    this.trackData(this.currentIndex);
    // 设置数据
    this.settingData(index);
  }

  /**
   * 删除页面
   * @param index 索引
   * @returns
   */
  public deletePage(index: number) {
    if (index === 0 && this.pageList.length === 1) {
      this.resetPage(index);
      return;
    }

    // 删除当前所在页
    if (index === this.currentIndex) {
      // 是否最后一页
      const isEnd = index === this.pageList.length - 1;
      this.pageList.splice(index, 1);
      this.settingData(isEnd ? index - 1 : index);
      return;
    }

    // 删除页在当前页之前
    if (index < this.currentIndex) {
      this.pageList.splice(index, 1);
      this.currentIndex -= 1;
      this.settingData(this.currentIndex);
      return;
    }

    // 删除页在当前页之后
    if (index > this.currentIndex) {
      this.pageList.splice(index, 1);
      return;
    }
  }

  /**
   * 重置页面
   * @param index
   */
  public resetPage(index: number) {
    this.pageList.splice(index, 1, createBasePage());
    chartEditStore.cleanStorageInfo();
    chartHistoryStore.cleanStack();
  }

  /**
   * 收集页面数据
   * @param index
   */
  public trackData(index: number) {
    // 获取后退栈
    let backStack: Array<HistoryItemType> = chartHistoryStore.getBackStack;
    // 获取前进栈
    let forwardStack: Array<HistoryItemType> =
      chartHistoryStore.getForwardStack;
    // 清空当前页面栈
    chartHistoryStore.cleanStack();
    // 记录栈
    this.currentPage.backStack = backStack;
    this.currentPage.forwardStack = forwardStack;
    // 记录组件
    let component = chartEditStore.getStorageInfo;
    this.currentPage.component = component;
    chartEditStore.cleanStorageInfo();
    this.pageList[index] = cloneDeep(this.currentPage);
  }

  /**
   * 设置当前页面数据
   * @param index
   */
  settingData(index: number) {
    this.currentPage = this.pageList[index];
    chartEditStore.cleanStorageInfo();
    chartEditStore.setStorageInfo(this.currentPage.component || {});
    chartHistoryStore.setStack(
      this.currentPage.backStack,
      this.currentPage.forwardStack
    );
    this.currentIndex = index;
  }
}

const Project = ref(new pageEditClass());

export default Project;
