export const UPDATE_FORECAST = 'UPDATE_FORECAST';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_TIME = 'UPDATE_TIME';

export function updateForecast(forecasts) {
  return {
    type: UPDATE_FORECAST,
    forecastsList: forecasts.daily.data.slice(0, 3),
    todayForecast: { ...forecasts.currently, timezone: forecasts.timezone },
  };
}

export function updateLocation(location) {
  return {
    type: UPDATE_LOCATION,
    location,
  };
}

export function updateTime() {
  return {
    type: UPDATE_TIME,
  };
}
