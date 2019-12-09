import { UPDATE_FORECAST, UPDATE_LOCATION, UPDATE_TIME, UPDATE_TEMP_SCALE } from './actions';
import LocalStorageProvider from './localStorageProvider';
import { DEFAULT_ICON, DEFAULT_SCALE } from './utils';

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
    language: LocalStorageProvider.getLanguage() || 'en',
    tempScale: LocalStorageProvider.getTempScale() || DEFAULT_SCALE,
  },
};

function updateReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FORECAST:
      return { ...state, forecasts: action.forecastsList, todayForecast: action.todayForecast };
    case UPDATE_LOCATION:
      return { ...state, location: action.location };
    case UPDATE_TIME:
      return { ...state, todayForecast: { ...state.todayForecast, time: state.todayForecast.time + 1 } };
    case UPDATE_TEMP_SCALE:
      LocalStorageProvider.setTempScale(action.tempScale);
      return { ...state, appSettings: { ...state.appSettings, tempScale: action.tempScale } };
    default:
      return state;
  }
}

export default updateReducer;
