/**
 * 封装操作localstorage本地存储的方法
 */
export const storage = {
  set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },

  get(key: string) {
    const value = window.localStorage.getItem(key);
    if (value && value !== 'undefined' && value !== 'null')
      return JSON.parse(value);
    else return '{}';
  },

  // 删除数据
  remove(key: string) {
    window.localStorage.removeItem(key);
  },
};

/**
 * 封装操作sessionStorage本地存储的方法
 */
export const sessionStorage = {
  //存储
  set(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },

  //取出数据
  get<T>(key: string) {
    const value = window.sessionStorage.getItem(key);
    if (value && value != 'undefined' && value != 'null')
      return JSON.parse(value);
    return null;
  },

  // 删除数据
  remove(key: string) {
    window.sessionStorage.removeItem(key);
  },
};

/**
 * * 存储本地会话数据
 * @param k 键名
 * @param v 键值（无需stringiiy）
 * @returns RemovableRef
 */
export const setLocalStorage = <T>(k: string, v: T) => {
  try {
    window.localStorage.setItem(k, JSON.stringify(v));
  } catch (error) {
    return false;
  }
};

/**
 * * 获取本地会话数据
 * @param k 键名
 * @returns any
 */
export const getLocalStorage = (k: string) => {
  const item = window.localStorage.getItem(k);
  try {
    return item ? JSON.parse(item) : item;
  } catch (err) {
    return item;
  }
};
