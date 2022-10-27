import { ref } from 'vue';
import {
  PackagesCategoryEnum,
  PackagesCategoryName,
} from './../../packages/index.d';
import { PackagesType } from '@/packages/index.d';
// 图表列表
import { usePackagesStore } from '@/store/packagesStore/packagesStore';

// 图表类型
export type MenuOptionsType = {
  key: string;
  label: string;
  list: PackagesType;
};

const { getPackagesList } = usePackagesStore();
const menuOptions: MenuOptionsType[] = [];

const packagesListObj = {
  [PackagesCategoryEnum.CHARTS]: {
    label: PackagesCategoryName.CHARTS,
  },
  [PackagesCategoryEnum.TEXT]: {
    label: PackagesCategoryName.TEXT,
  },
  [PackagesCategoryEnum.MEDIA]: {
    label: PackagesCategoryName.MEDIA,
  },
  [PackagesCategoryEnum.MATERIAL]: {
    label: PackagesCategoryName.MATERIAL,
  },
};

// 处理列表
const handlePackagesList = () => {
  for (const val in getPackagesList) {
    menuOptions.push({
      key: val,
      // @ts-ignore
      label: packagesListObj[val].label,
      // @ts-ignore
      list: getPackagesList[val],
    });
  }
};
handlePackagesList();

// 记录选中值
let beforeSelect: string = menuOptions[0]['key'];
const selectValue = ref<string>(menuOptions[0]['key']);

// 选中的对象值
const selectOptions = ref(menuOptions[0]);

// 点击 item
// const clickItemHandle = (key: string, item: any) => {
//   selectOptions.value = item;
//   // 处理折叠
//   if (beforeSelect === key) {
//     setItem(ChartLayoutStoreEnum.CHARTS, !getCharts.value);
//   } else {
//     setItem(ChartLayoutStoreEnum.CHARTS, true);
//   }
//   beforeSelect = key;
// };

export { selectOptions, selectValue, menuOptions };
