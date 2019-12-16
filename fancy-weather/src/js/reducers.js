import {
  UPDATE_FORECAST,
  UPDATE_LOCATION,
  UPDATE_TEMP_SCALE,
  UPDATE_LANG,
  UPDATE_PRELOADER_STATUS,
  BG_FETCH_FAIL,
  BG_FETCH_SUCCESS,
} from './actions';
import LocalStorageProvider from './localStorageProvider';
import { DEFAULT_ICON, DEFAULT_SCALE, DEFAULT_LANG } from './utils';

const initialState = {
  forecasts: [
    { time: 'unknown', temperatureHigh: 'unknown' },
    { time: 'unknown', temperatureHigh: 'unknown' },
    { time: 'unknown', temperatureHigh: 'unknown' },
  ],
  todayForecast: { time: 0, temperature: 0, icon: DEFAULT_ICON, apparentTemperature: 0 },
  location: {
    city: '',
    country: '',
    coordinates: {
      lat: 0,
      lng: 0,
    },
  },
  appSettings: {
    language: LocalStorageProvider.getSettings() ? LocalStorageProvider.getSettings().language : DEFAULT_LANG,
    tempScale: LocalStorageProvider.getSettings() ? LocalStorageProvider.getSettings().tempScale : DEFAULT_SCALE,
  },
  isLoading: true,
  isError: false,
};

function updateReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FORECAST:
      return { ...state, forecasts: action.forecastsList, todayForecast: action.todayForecast };
    case UPDATE_LOCATION:
      return { ...state, location: action.location };
    case UPDATE_TEMP_SCALE:
      return { ...state, appSettings: { ...state.appSettings, tempScale: action.tempScale } };
    case UPDATE_LANG:
      return { ...state, appSettings: { ...state.appSettings, language: action.language } };
    case UPDATE_PRELOADER_STATUS:
      return { ...state, isLoading: action.isLoading };
    case BG_FETCH_FAIL:
      return { ...state, isError: true };
    case BG_FETCH_SUCCESS:
      return { ...state, isError: false };
    default:
      return state;
  }
}

export default updateReducer;
