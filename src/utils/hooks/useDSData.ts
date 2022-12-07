import { HttpResponse } from '@/types';
import { DSService } from '@/api/DS';
import { ref, computed } from 'vue';
import { useTargetData } from '@/utils/hooks/useTargetData';

const DSList = ref<any>([]);

DSService.getDSList({}).then((res: HttpResponse) => {
  DSList.value = res.data;
});

export { DSList };

export const useDSData = () => {
  const targetRequestConfig = computed(() => {
    const { targetData, chartEditStore } = useTargetData();
    return targetData.value.requestConfig;
  });

  return { targetRequestConfig, DSList };
};
