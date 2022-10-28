import {
  PackagesType,
  ConfigType,
  PackagesGenreType,
} from '@/packages/index.d';

export { ConfigType };

export { PackagesType };

export { PackagesGenreType };

export interface PackagesStoreType {
  packagesList: PackagesType;
  packagesGenreList: PackagesGenreType;
}
