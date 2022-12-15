import {
  GenreEnumName,
  GenreEnum,
} from './../../packages/components/Charts/index.d';
import { ref } from 'vue';
import {
  PackagesCategoryEnum,
  PackagesCategoryName,
} from './../../packages/index.d';
import {
  PackagesType,
  PackagesGenreType,
  GenreType,
  ConfigType,
} from '@/packages/index.d';
// 图表列表
import { usePackagesStore } from '@/store/packagesStore/packagesStore';

// 图表类型
export type MenuOptionsType = {
  key: string;
  label: string;
  list: PackagesType;
};

export type genreMenuOptionsType = {
  key?: string;
  label?: string;
  list: GenreType;
  all: ConfigType[];
};

const { getPackagesList, getPackagesGenreList } = usePackagesStore();

const menuOptions: MenuOptionsType[] = [];
const genreMenuOptions: genreMenuOptionsType[] = [];

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

const packagesGenreListObj = {
  [PackagesCategoryEnum.CHARTS]: {
    [GenreEnum.COMPARE]: {
      label: GenreEnumName.COMPARE,
    },
    [GenreEnum.TREND]: {
      label: GenreEnumName.TREND,
    },
    [GenreEnum.TABLE]: {
      label: GenreEnumName.TABLE,
    },
    [GenreEnum.TARGET]: {
      label: GenreEnumName.TARGET,
    },
    [GenreEnum.DISTRIBUTION]: {
      label: GenreEnumName.DISTRIBUTION,
    },
    [GenreEnum.SPACE]: {
      label: GenreEnumName.SPACE,
    },
  },
  [PackagesCategoryEnum.TEXT]: {
    Text: {
      label: '文本',
    },
  },
  [PackagesCategoryEnum.MATERIAL]: {
    Header: {
      label: '头部装饰',
    },
    Border: {
      label: '区块边框',
    },
    Curoffline: {
      label: '分割线',
    },
  },
  [PackagesCategoryEnum.MEDIA]: {
    Image: {
      label: '图片',
    },
    Video: {
      label: '视频',
    },
    Clock: {
      label: '时钟',
    },
  },
};

console.log(getPackagesGenreList);

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
  for (const val in getPackagesGenreList) {
    genreMenuOptions.push({
      key: val,
      // @ts-ignore
      label: packagesListObj[val].label,
      // @ts-ignore
      // list: getPackagesGenreList[val],
      list: {},
      all: [],
    });
    // @ts-ignore
    for (const vals in getPackagesGenreList[val]) {
      // @ts-ignore
      genreMenuOptions[genreMenuOptions.length - 1].list[vals] =
        // @ts-ignore
        {
          key: vals,
          // @ts-ignore
          label: packagesGenreListObj[val][vals].label,
          // @ts-ignore
          list: getPackagesGenreList[val][vals],
        };
      // @ts-ignore
      genreMenuOptions[genreMenuOptions.length - 1]['all'].push(
        // @ts-ignore
        ...getPackagesGenreList[val][vals]
      );
    }
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

export { selectOptions, selectValue, menuOptions, genreMenuOptions };
