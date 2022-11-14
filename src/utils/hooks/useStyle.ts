import { PickCreateComponentType } from '@/packages/index.d';
import { EditCanvasConfigType } from '@/store/chartEditStore/chartEditStore.d';

type AttrType = PickCreateComponentType<'attr'>;

export const useComponentStyle = (attr: AttrType, index: number) => {
  if (!attr) return {};
  const componentStyle = {
    zIndex: index + 1,
    left: `${attr.x}px`,
    top: `${attr.y}px`,
  };
  return componentStyle;
};

export const useSizeStyle = (attr: AttrType, scale?: number) => {
  if (!attr) return {};
  return {
    width: `${scale ? scale * attr.w : attr.w}px`,
    height: `${scale ? scale * attr.h : attr.h}px`,
  };
};

// 锚点位置
export const usePointStyle = (
  point: string,
  index: number,
  attr: PickCreateComponentType<'attr'>,
  cursorResize: string[]
) => {
  const { w: width, h: height } = attr;

  const isTop = /t/.test(point);
  const isBottom = /b/.test(point);
  const isLeft = /l/.test(point);
  const isRight = /r/.test(point);

  let newLeft = 0;
  let newTop = 0;

  // 四个角的点
  if (point.length === 2) {
    newLeft = isLeft ? 0 : width;
    newTop = isTop ? 0 : height;
  } else {
    // 上下两点的点，宽度居中
    if (isTop || isBottom) {
      newLeft = width / 2;
      newTop = isTop ? 0 : height;
    }

    // 左右两边的点，高度居中
    if (isLeft || isRight) {
      newLeft = isLeft ? 0 : width;
      newTop = Math.floor(height / 2);
    }
  }

  const style = {
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: cursorResize[index] + '-resize',
  };

  return style;
};

export const usePageStyle = (editCanvasConfig: EditCanvasConfigType) => {
  const backgroundType = editCanvasConfig.backgroundType;
  const background = editCanvasConfig.background;
  const backgroundImage = editCanvasConfig.backgroundImage;
  const backgroundColor =
    backgroundType === 'background' ? background : backgroundImage;

  const computedBackground =
    backgroundType === 'background'
      ? { background: backgroundColor }
      : {
          background: backgroundImage
            ? `url(${backgroundImage}) no-repeat center center / cover !important`
            : background,
        };

  // @ts-ignore
  return {
    position: 'relative' as const,
    width: editCanvasConfig.width
      ? `${editCanvasConfig.width || 100}px`
      : '100%',
    height: editCanvasConfig.height ? `${editCanvasConfig.height}px` : '100%',
    ...computedBackground,
  };
};

// 设置位置
export const getComponentAttrStyle = (attr: AttrType, index: number) => {
  const componentStyle = {
    zIndex: index + 1,
    left: `${attr.x}px`,
    top: `${attr.y}px`
  }
  return componentStyle
}

// 设置大小
export const getSizeStyle = (attr: AttrType, scale?: number) => {
  return ({
    width: `${scale ? scale * attr.w : attr.w}px`,
    height: `${scale ? scale * attr.h : attr.h}px`
  })
}
