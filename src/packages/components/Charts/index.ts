import { GenreEnum } from './index.d';
import Compare from './Compare';
import Trend from './Trend';
import Distribution from './Distribution';
import Target from './Target';
import Space from './Space';

export const ChartList = [
  ...Compare,
  ...Trend,
  ...Distribution,
  ...Target,
  ...Space,
];

export const ChartGenreList = {
  [GenreEnum.COMPARE]: [...Compare],
  [GenreEnum.TREND]: [...Trend],
  [GenreEnum.DISTRIBUTION]: [...Distribution],
  [GenreEnum.TARGET]: [...Target],
  [GenreEnum.SPACE]: [...Space],
};
