import { GenreEnum } from './index.d';
import Compare from './Compare';
import Trend from './Trend';

export const ChartList = [...Compare, ...Trend];

export const ChartGenreList = {
  [GenreEnum.COMPARE]: [...Compare],
  [GenreEnum.TREND]: [...Trend],
};
