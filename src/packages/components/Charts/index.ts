import { GenreEnum } from './index.d';
import Compare from './Compare';
import Trend from './Trend';
import Distribution from './Distribution';
import Target from './Target';
import Space from './Space';
import Table from './Table';

export const ChartList = [
  ...Compare,
  ...Trend,
  ...Distribution,
  ...Target,
  ...Space,
  ...Table,
];

export const ChartGenreList = {
  [GenreEnum.COMPARE]: [...Compare],
  [GenreEnum.TREND]: [...Trend],
  [GenreEnum.DISTRIBUTION]: [...Distribution],
  [GenreEnum.TARGET]: [...Target],
  [GenreEnum.SPACE]: [...Space],
  [GenreEnum.TABLE]: [...Table],
};
