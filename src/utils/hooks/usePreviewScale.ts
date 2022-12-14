import throttle from 'lodash/throttle';
import { isPreview } from '@/utils';
import { ref, toRefs, nextTick, Ref } from 'vue';
import type VChart from 'vue-echarts';
import { CreateComponentType, ChartFrameEnum } from '@/packages/index.d';
import { DSService } from '@/api/DS';

// 拆出来是为了更好的分离单独复用

// * 屏幕缩放适配（两边留白）
export const usePreviewFitScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: { width: number; height: number }) => void
) => {
  // * 画布尺寸（px）
  const baseWidth = width;
  const baseHeight = height;

  // * 默认缩放值
  const scale = {
    width: 1,
    height: 1,
  };

  // * 需保持的比例
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));
  const calcRate = () => {
    // 当前屏幕宽高比
    const currentRate = parseFloat(
      (window.innerWidth / window.innerHeight).toFixed(5)
    );
    if (scaleDom) {
      if (currentRate > baseProportion) {
        // 表示更宽
        scale.width = parseFloat(
          ((window.innerHeight * baseProportion) / baseWidth).toFixed(5)
        );
        scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5));
        scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`;
      } else {
        // 表示更高
        scale.height = parseFloat(
          (window.innerWidth / baseProportion / baseHeight).toFixed(5)
        );
        scale.width = parseFloat((window.innerWidth / baseWidth).toFixed(5));
        scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`;
      }
      if (callback) callback(scale);
    }
  };

  const resize = throttle(() => {
    calcRate();
  }, 200);

  // * 改变窗口大小重新绘制
  const windowResize = () => {
    window.addEventListener('resize', resize);
  };

  // * 改变窗口大小重新绘制
  const unWindowResize = () => {
    window.removeEventListener('resize', resize);
  };

  return {
    calcRate,
    windowResize,
    unWindowResize,
  };
};

// *  X轴撑满，Y轴滚动条
export const usePreviewScrollYScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: { width: number; height: number }) => void
) => {
  // * 画布尺寸（px）
  const baseWidth = width;
  const baseHeight = height;

  // * 默认缩放值
  const scale = {
    width: 1,
    height: 1,
  };

  // * 需保持的比例
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));
  const calcRate = () => {
    if (scaleDom) {
      scale.height = parseFloat(
        (window.innerWidth / baseProportion / baseHeight).toFixed(5)
      );
      scale.width = parseFloat((window.innerWidth / baseWidth).toFixed(5));
      scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`;
      if (callback) callback(scale);
    }
  };

  const resize = throttle(() => {
    calcRate();
  }, 200);

  // * 改变窗口大小重新绘制
  const windowResize = () => {
    window.addEventListener('resize', resize);
  };

  // * 改变窗口大小重新绘制
  const unWindowResize = () => {
    window.removeEventListener('resize', resize);
  };

  return {
    calcRate,
    windowResize,
    unWindowResize,
  };
};

// *  Y轴撑满，X轴滚动条
export const usePreviewScrollXScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: { width: number; height: number }) => void
) => {
  // * 画布尺寸（px）
  const baseWidth = width;
  const baseHeight = height;

  // * 默认缩放值
  const scale = {
    height: 1,
    width: 1,
  };

  // * 需保持的比例
  const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));
  const calcRate = () => {
    if (scaleDom) {
      scale.width = parseFloat(
        ((window.innerHeight * baseProportion) / baseWidth).toFixed(5)
      );
      scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5));
      scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`;
      if (callback) callback(scale);
    }
  };

  const resize = throttle(() => {
    calcRate();
  }, 200);

  // * 改变窗口大小重新绘制
  const windowResize = () => {
    window.addEventListener('resize', resize);
  };

  // * 改变窗口大小重新绘制
  const unWindowResize = () => {
    window.removeEventListener('resize', resize);
  };

  return {
    calcRate,
    windowResize,
    unWindowResize,
  };
};

// * 变形内容，宽高铺满
export const usePreviewFullScale = (
  width: number,
  height: number,
  scaleDom: HTMLElement | null,
  callback?: (scale: { width: number; height: number }) => void
) => {
  // * 默认缩放值
  const scale = {
    width: 1,
    height: 1,
  };

  const calcRate = () => {
    if (scaleDom) {
      scale.width = parseFloat((window.innerWidth / width).toFixed(5));
      scale.height = parseFloat((window.innerHeight / height).toFixed(5));
      scaleDom.style.transform = `scale(${scale.width}, ${scale.height})`;
      if (callback) callback(scale);
    }
  };

  const resize = throttle(() => {
    calcRate();
  }, 200);

  // * 改变窗口大小重新绘制
  const windowResize = () => {
    window.addEventListener('resize', resize);
  };

  // * 改变窗口大小重新绘制
  const unWindowResize = () => {
    window.removeEventListener('resize', resize);
  };

  return {
    calcRate,
    windowResize,
    unWindowResize,
  };
};

/**
 * echatrs预览发送请求
 * @param targetComponent
 * @param updateCallback
 * @returns
 */
export const usePreviewRequest = (
  targetComponent: CreateComponentType,
  updateCallback?: (...args: any) => any
) => {
  const vChartRef = ref<typeof VChart | null>(null);

  const { requestConfig } = toRefs(targetComponent);

  const requestIntervalFn = () => {
    DSService.getComponentData([
      ...requestConfig.value.dimension,
      ...requestConfig.value.measure,
    ]).then((res: any) => {
      nextTick(() => {
        if (vChartRef.value) {
          console.log('更新接口数据');
          vChartRef.value.setOption({
            dataset: {
              source: res.data[0],
            },
          });
        }
      });
    });
  };

  isPreview() && requestIntervalFn();
  return { vChartRef };
};

/**
 * target类型组件 发送请求
 */
export const useTargetPreviewRequest = (
  targetComponent: CreateComponentType,
  resultData?: any,
  targetData?: any
) => {
  const vChartRef = ref<typeof VChart | null>(null);

  const { requestConfig } = toRefs(targetComponent);

  const requestIntervalFn = () => {
    DSService.getComponentData([
      ...requestConfig.value.dimension,
      ...requestConfig.value.measure,
    ]).then((res: any) => {
      nextTick(() => {
        if (vChartRef.value) {
          if (requestConfig.value.dataType === 1) {
            targetData.value = res.data[0]['2'] || 0;
            resultData.value =
              Math.round((res.data[0]['1'] / targetData.value) * 10000) / 100;
          }
          if (requestConfig.value.dataType === 2) {
            targetData.value = requestConfig.value.data as number;
            resultData.value =
              Math.round((res.data[0]['1'] / targetData.value) * 10000) / 100;
          }
        }
      });
    });
  };

  isPreview() && requestIntervalFn();
  return { vChartRef };
};

/**
 * 表格类定时刷新
 */
export const useTableTimeInterval = (
  pageNum: Ref<number>,
  currentPage: Ref<number>,
  currentPageData: Ref<any[]>,
  allPageData: Ref<any[]>,
  dataset: Ref<any>,
  pageSize: Ref<any>
) => {
  const vChartRef = ref<null>(null);
  const time = ref<NodeJS.Timer | null>(null);
  if (pageNum.value > 1) {
    // 需要定时换页
    time.value = setInterval(() => {
      ++currentPage.value;
      if (currentPage.value > pageNum.value) {
        currentPage.value = 0;
      }
      currentPageData.value = allPageData.value.slice(
        pageNum.value * currentPage.value,
        pageSize.value
      );
      dataset.value.data = currentPageData.value;
    }, 1000);
  }
  console.log(pageNum.value);

  return { vChartRef };
};
