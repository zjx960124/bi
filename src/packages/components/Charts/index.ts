import { GenreEnum } from './index.d';
import Compare from './Compare';
import Trend from './Trend';
import Distribution from './Distribution';
import Target from './Target';

export const ChartList = [...Compare, ...Trend, ...Distribution, ...Target];

export const ChartGenreList = {
  [GenreEnum.COMPARE]: [...Compare],
  [GenreEnum.TREND]: [...Trend],
  [GenreEnum.DISTRIBUTION]: [...Distribution],
  [GenreEnum.TARGET]: [...Target],
};
