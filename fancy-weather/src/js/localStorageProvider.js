const LANG_KEY = 'lang';
const TEMP_SCALE_KEY = 'temp';

export default class LocalStorageProvider {
  static setLanguage(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      throw new Error(`LocalStorage Error: ${e}`);
    }
  }

  static getLanguage() {
    return localStorage.getItem(LANG_KEY);
  }

  static setTempScale(temp) {
    try {
      localStorage.setItem(TEMP_SCALE_KEY, temp);
    } catch (e) {
      throw new Error(`LocalStorage Error: ${e}`);
    }
  }

  static getTempScale() {
    return localStorage.getItem(TEMP_SCALE_KEY);
  }
}
