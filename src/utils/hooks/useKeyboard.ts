import { useChartEditStore } from '@/store/chartEditStore/chartEditStore';
import { WinKeyboard, MacKeyboard, MenuEnum } from '@/enums/editPageEnum';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import keymaster from 'keymaster';

const chartEditStore = useChartEditStore();

const winCtrlMerge = (e: string) => `${WinKeyboard.CTRL}+${e}`;
const winShiftMerge = (e: string) => `${WinKeyboard.SHIFT}+${e}`;
const winAltMerge = (e: string) => `${WinKeyboard.ALT}+${e}`;

export const winKeyboardValue = {
  [MenuEnum.COPY]: winCtrlMerge('c'),
  [MenuEnum.CUT]: winCtrlMerge('x'),
  [MenuEnum.PARSE]: winCtrlMerge('v'),
  [MenuEnum.DELETE]: 'delete',
  [MenuEnum.BACK]: winCtrlMerge('z'),
  [MenuEnum.FORWORD]: winCtrlMerge(winShiftMerge('z')),
};

const macCtrlMerge = (e: string) => `${MacKeyboard.CTRL}+${e}`;
const macShiftMerge = (e: string) => `${MacKeyboard.SHIFT}+${e}`;
const macAltMerge = (e: string) => `${MacKeyboard.ALT}+${e}`;

// Win 快捷键列表
const winKeyList: Array<string> = [
  winKeyboardValue.delete,
  winKeyboardValue.copy,
  winKeyboardValue.cut,
  winKeyboardValue.parse,

  winKeyboardValue.back,
  winKeyboardValue.forward,
];

// 处理键盘记录
const keyRecordHandle = () => {
  // 初始化清空
  if (window.$KeyboardActive) window.$KeyboardActive = new Set([]);

  document.onkeydown = (e: KeyboardEvent) => {
    if (window.$KeyboardActive)
      window.$KeyboardActive.add(e.key.toLocaleLowerCase());
    else window.$KeyboardActive = new Set([e.key.toLocaleLowerCase()]);
  };

  document.onkeyup = (e: KeyboardEvent) => {
    if (window.$KeyboardActive)
      window.$KeyboardActive.delete(e.key.toLocaleLowerCase());
  };
};

// 初始化监听事件
export const useAddKeyboard = () => {
  const throttleTime = 50;
  const switchHandle = (keyboardValue: typeof winKeyboardValue, e: string) => {
    switch (e) {
      // 删除 delete
      case keyboardValue.delete:
        keymaster(
          e,
          debounce(() => {
            chartEditStore.removeComponentList();
            return false;
          }, throttleTime)
        );
        break;
      // 复制 ct+v
      case keyboardValue.copy:
        keymaster(
          e,
          debounce(() => {
            chartEditStore.setCopy();
            return false;
          }, throttleTime)
        );
        break;
      // 剪切 ct+x
      case keyboardValue.cut:
        keymaster(
          e,
          debounce(() => {
            chartEditStore.setCut();
            return false;
          }, throttleTime)
        );
        break;
      // 粘贴 ct+v
      case keyboardValue.parse:
        keymaster(
          e,
          throttle(() => {
            chartEditStore.setParse();
            return false;
          }, throttleTime)
        );
        break;

      // 撤回 ct+z
      case keyboardValue.back:
        keymaster(
          e,
          throttle(() => {
            chartEditStore.setBack();
            return false;
          }, throttleTime)
        );
        break;
      // 前进 ct+sh+z
      case keyboardValue.forward:
        keymaster(
          e,
          throttle(() => {
            chartEditStore.setForward();
            return false;
          }, throttleTime)
        );
        break;
    }
  };
  winKeyList.forEach((key: string) => {
    switchHandle(winKeyboardValue, key);
  });

  keyRecordHandle();
};

// 卸载监听事件
export const useRemoveKeyboard = () => {
  document.onkeydown = () => {};
  document.onkeyup = () => {};

  winKeyList.forEach((key: string) => {
    keymaster.unbind(key);
  });
};
