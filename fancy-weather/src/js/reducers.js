import { UPDATE_FORECAST, UPDATE_LOCATION } from './actions';

const initialState = {
  forecasts: [
    { time: 'unknown', temperatureHigh: 'unknown' },
    { time: 'unknown', temperatureHigh: 'unknown' },
    { time: 'unknown', temperatureHigh: 'unknown' },
  ],
  todayForecast: { time: 'unknown', temperatureHigh: 'unknown' },
  location: {},
};

function updateReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FORECAST:
      return { ...state, forecasts: action.forecastsList, todayForecast: action.todayForecast };
    case UPDATE_LOCATION:
      return { ...state, location: action.location };
    default:
      return state;
  }
}

export default updateReducer;
