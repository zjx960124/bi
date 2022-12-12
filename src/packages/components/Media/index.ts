export enum GenreEnum {
  IMAGE = 'Image',
  VIDEO = 'Video',
  CLOCK = 'Clock',
}

import Image from './Image';
import Video from './Video';
import Clock from './Clock';

export const MediaList = [...Image, ...Video, ...Clock];

export const MediaGenreList = {
  [GenreEnum.IMAGE]: [...Image],
  [GenreEnum.VIDEO]: [...Video],
  [GenreEnum.CLOCK]: [...Clock],
};
