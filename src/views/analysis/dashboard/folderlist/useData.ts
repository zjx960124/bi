import { ref } from 'vue';
import { DashboardList } from '@/types';
export const useDataListInit = () => {
  const list = ref<DashboardList>({
    folderName: '仪表盘文件夹',
    list: [
      {
        id: '1',
        name: '仪表盘1',
      },
      {
        id: '2',
        name: '仪表盘2',
      },
      {
        id: '3',
        name: '仪表盘3',
      },
      {
        id: '4',
        name: '仪表盘4',
      },
    ],
  });

  return {
    list,
  };
};
