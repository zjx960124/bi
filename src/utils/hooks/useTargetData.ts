import { computed, Ref } from 'vue';
import {
  CreateComponentType,
  CreateComponentGroupType,
} from '@/packages/index.d';
import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
import { DashboardLayout } from '@/packages';

// 获取当前对象数据
export const useTargetData = () => {
  const chartEditStore = useChartEditStore();
  const targetData: Ref<CreateComponentType | CreateComponentGroupType> =
    computed(() => {
      const list = chartEditStore.getComponentList;
      console.log(list);
      const targetIndex = chartEditStore.fetchTargetIndex();
      return list[targetIndex];
    });
  const layoutList: Ref<Array<DashboardLayout>> = computed(() => {
    const list = chartEditStore.getComponentList;
    return list.map((item) => item.layout) as Array<DashboardLayout>;
  });
  return { targetData, chartEditStore, layoutList };
};
