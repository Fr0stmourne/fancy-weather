export const UPDATE_FORECAST = 'UPDATE_FORECAST';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_TIME = 'UPDATE_TIME';
export const UPDATE_TEMP_SCALE = 'UPDATE_TEMP_SCALE';
export const UPDATE_LANG = 'UPDATE_LANG';

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

export function updateTempScale(tempScale) {
  return {
    type: UPDATE_TEMP_SCALE,
    tempScale,
  };
}

export function updateLang(language) {
  return {
    type: UPDATE_LANG,
    language,
  };
}
