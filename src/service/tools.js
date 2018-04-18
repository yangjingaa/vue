/**
 * 设置本地数据
 * @param key
 * @param value
 */
export const setLocalData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取本地数据
 * @param key
 * @returns {*}
 */
export const getLocalData = (key) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(localStorage.getItem(key));
  }
  return value;
};

/**
 * 根据key, 清除某个数据
 * @param key
 */
export const removeLocalData = (key) => {
  localStorage.removeItem(key);
};

/**
 * 删除所有本地保存的数据
 */
export const clearLocalData = () => {
  localStorage.clear();
};

/**
 * 字符串拼接
 * @param url
 * @returns {string}
 */
export const urlSplice = (url) => {
  if (url && url !== {}) {
    let str = "?";
    for (let key in url) {
      if (url[key]) {
        str += `${key}=${url[key]}&&`
      }
    }
    str = str.slice(0, -2);
    return str;
  }
};




