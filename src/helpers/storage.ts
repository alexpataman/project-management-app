import { LOCAL_STORAGE_PREFIX } from '../constants';

type storeType = object | string;

export const storage = {
  prefix: LOCAL_STORAGE_PREFIX,

  computeFieldName(fieldName: string) {
    return this.prefix + fieldName;
  },

  set(fieldName: string | { [key: string]: storeType }, data?: storeType) {
    if (typeof fieldName === 'string' && data) {
      this.setField(fieldName, data);
    } else {
      Object.entries(fieldName).forEach(([key, value]) => this.setField(key, value));
    }
  },

  setField(fieldName: string, data: storeType) {
    localStorage.setItem(this.computeFieldName(fieldName), JSON.stringify(data));
  },

  get(fieldName: string) {
    const computedName = this.computeFieldName(fieldName);
    const storedItem = localStorage.getItem(computedName);

    return this.exists(fieldName) && storedItem ? JSON.parse(storedItem) : null;
  },

  remove(fieldName: string) {
    const computedName = this.computeFieldName(fieldName);
    localStorage.removeItem(computedName);
  },

  exists(fieldName: string) {
    return !!localStorage.getItem(this.computeFieldName(fieldName));
  },

  clear() {
    Object.keys(localStorage).forEach((el) => {
      if (el.indexOf(this.prefix) === 0) {
        localStorage.removeItem(el);
      }
    });
  },
};
