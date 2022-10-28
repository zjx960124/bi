import { defineStore } from 'pinia';
import {
  PackagesStoreType,
  PackagesType,
  PackagesGenreType,
} from './packagesStore.d';
import { packagesList, packagesGenreList } from '@/packages/index';

// 组件 pakages
export const usePackagesStore = defineStore({
  id: 'usePackagesStore',
  state: (): PackagesStoreType => ({
    packagesList: Object.freeze(packagesList),
    packagesGenreList: Object.freeze(packagesGenreList),
  }),
  getters: {
    getPackagesList(): PackagesType {
      return this.packagesList;
    },
    getPackagesGenreList(): PackagesGenreType {
      return this.packagesGenreList;
    },
  },
});
