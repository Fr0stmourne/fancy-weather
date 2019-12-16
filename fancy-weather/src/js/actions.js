import { setBackground, getPhotosJSON, getUserLocation, getWeatherJSON, getCoordinatesJSON } from './utils';
import countriesMapping from './countriesMapping';

export const UPDATE_FORECAST = 'UPDATE_FORECAST';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_TEMP_SCALE = 'UPDATE_TEMP_SCALE';
export const UPDATE_LANG = 'UPDATE_LANG';
export const UPDATE_PRELOADER_STATUS = 'UPDATE_PRELOADER_STATUS';

export function updatePreloader(booleanStatus) {
  return {
    type: UPDATE_PRELOADER_STATUS,
    isLoading: booleanStatus,
  };
}

function updateForecast(weather) {
  return {
    type: UPDATE_FORECAST,
    forecastsList: weather.daily.data.slice(0, 3),
    todayForecast: { ...weather.currently, timezone: weather.timezone },
  };
}

export function updateWeather(location, lang) {
  return async dispatch => {
    dispatch(updatePreloader(true));
    const currentLocationWeather = await getWeatherJSON(location, lang);
    dispatch(updateForecast(currentLocationWeather));
    dispatch(updatePreloader(false));
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
  return { type: UPDATE_LANG, language };
}

export function getLocation(town, language) {
  return async dispatch => {
    dispatch(updatePreloader(true));
    const geocodingData = await getCoordinatesJSON(town, language);
    const cityField = geocodingData.results[0].components;
    const newLocation = {
      city: cityField.city || cityField.town || cityField.county || cityField.state || cityField.village,
      country: cityField.country,
      coordinates: geocodingData.results[0].geometry,
    };

    dispatch(updateLocation(newLocation));
    dispatch(updatePreloader(false));
  };
}

export function getInitialLocation() {
  return async dispatch => {
    const userLocation = await getUserLocation();
    const [lat, lng] = userLocation.loc.split(',').map(el => +el);
    userLocation.coordinates = { lat, lng };
    userLocation.country = countriesMapping[userLocation.country];
    dispatch(updateLocation(userLocation));
  };
}

export function updateBackgroundPhoto(weather, time) {
  return async dispatch => {
    dispatch(updatePreloader(true));
    const monthIndex = new Date(time * 1000).getMonth();
    const currentHour = new Date(time * 1000).getHours();
    const data = await getPhotosJSON(weather, monthIndex, currentHour);
    const photoLink = data.urls.full;
    setBackground(photoLink);
    dispatch(updatePreloader(false));
  };
}
