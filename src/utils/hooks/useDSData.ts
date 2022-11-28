import { HttpResponse } from '@/types';
import { DSService } from '@/api/DS';
import { ref } from 'vue';

const DSList = ref<any>([]);

DSService.getDSList({}).then((res: HttpResponse) => {
  DSList.value = res.data;
});

export { DSList };
