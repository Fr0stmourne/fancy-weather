import { getCoordinatesJSON, setBackground, getPhotosJSON } from './utils';

export const UPDATE_FORECAST = 'UPDATE_FORECAST';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_TEMP_SCALE = 'UPDATE_TEMP_SCALE';
export const UPDATE_LANG = 'UPDATE_LANG';
export const UPDATE_BG = 'UPDATE_BG';

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

export function updateBackground() {
  return {
    type: UPDATE_BG,
  };
}

export function updateLocationAsync(town) {
  return async dispatch => {
    const geocodingData = await getCoordinatesJSON(town);
    const cityField = geocodingData.results[0].components;
    const newLocation = {
      city: cityField.city || cityField.county || cityField.state || cityField.village,
      country: geocodingData.results
        .find(result => Object.keys(result.components).includes('country_code'))
        .components.country_code.toUpperCase(),
      coordinates: geocodingData.results[0].geometry,
    };
    dispatch(updateLocation(newLocation));
  };
}

export function updateBackgroundPhoto(weather, monthIndex, location) {
  return async dispatch => {
    const data = await getPhotosJSON(weather, monthIndex, { lat: location.lat, lng: location.lng });
    const chosenPhoto = data.photos.photo[Math.round(Math.random() * data.photos.photo.length)];
    setBackground(chosenPhoto.url_h);
    dispatch(updateBackground());
  };
}
