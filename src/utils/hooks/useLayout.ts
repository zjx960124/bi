import { onUnmounted, onMounted } from 'vue';
import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
import { EditCanvasTypeEnum } from '@/store/chartEditStore/chartEditStore.d';

const chartEditStore = useChartEditStore();

// 布局处理
export const useLayout = () => {
  onMounted(() => {
    chartEditStore.setEditCanvas(
      EditCanvasTypeEnum.EDIT_LAYOUT_DOM,
      document.getElementById('go-chart-edit-layout')
    );
    chartEditStore.setEditCanvas(
      EditCanvasTypeEnum.EDIT_CONTENT_DOM,
      document.getElementById('go-chart-edit-content')
    );

    // 监听初始化
    const removeScale = chartEditStore.listenerScale();

    onUnmounted(() => {
      chartEditStore.setEditCanvas(EditCanvasTypeEnum.EDIT_LAYOUT_DOM, null);
      chartEditStore.setEditCanvas(EditCanvasTypeEnum.EDIT_CONTENT_DOM, null);
      removeScale();
    });
  });
};
