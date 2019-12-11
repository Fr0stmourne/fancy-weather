const SETTINGS_KEY = 'appSettings';

export default class LocalStorageProvider {
  static getSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY));
    } catch (e) {
      throw new Error(`LocalStorage Error: ${e}`);
    }
  }

  static setSettings(settings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      throw new Error(`LocalStorage Error: ${e}`);
    }
  }
}
