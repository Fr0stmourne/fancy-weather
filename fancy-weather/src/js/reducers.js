import { UPDATE_FORECAST, UPDATE_LOCATION, UPDATE_TIME } from './actions';

const initialState = {
  forecasts: [
    { time: 'unknown', temperatureHigh: 'unknown' },
    { time: 'unknown', temperatureHigh: 'unknown' },
    { time: 'unknown', temperatureHigh: 'unknown' },
  ],
  todayForecast: { time: 'unknown', temperatureHigh: 'unknown' },
  location: {
    city: '',
    country: '',
    coordinates: {
      lat: 0,
      lng: 0,
    },
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
    default:
      return state;
  }
}

export default updateReducer;
