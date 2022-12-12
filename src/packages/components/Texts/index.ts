export enum GenreEnum {
  TEXT = 'Text',
}

import Text from './Text';

export const TextList = [...Text];

export const TextGenreList = {
  [GenreEnum.TEXT]: [...Text],
};
