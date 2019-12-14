import {
  setBackground,
  getPhotosJSON,
  getUserLocation,
  // getCoordsObjFromString,
  getWeatherJSON,
  getCoordinatesJSON,
} from './utils';
import countriesMapping from './countriesMapping';

export const UPDATE_FORECAST = 'UPDATE_FORECAST';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_TEMP_SCALE = 'UPDATE_TEMP_SCALE';
export const UPDATE_LANG = 'UPDATE_LANG';
export const UPDATE_BG = 'UPDATE_BG';

function updateForecast(weather) {
  return {
    type: UPDATE_FORECAST,
    forecastsList: weather.daily.data.slice(0, 3),
    todayForecast: { ...weather.currently, timezone: weather.timezone },
  };
}

export function updateWeather(location, lang) {
  return async dispatch => {
    // console.log('fetching with', lang, location);
    const currentLocationWeather = await getWeatherJSON(location, lang);
    // console.log(currentLocationWeather);
    dispatch(updateForecast(currentLocationWeather));
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

export function updateBackground() {
  return {
    type: UPDATE_BG,
  };
}

export function getLocation(town, language) {
  // const COUNTRY_CODE = 'country_code';
  return async dispatch => {
    const geocodingData = await getCoordinatesJSON(town, language);
    console.log('opencage', geocodingData);
    const cityField = geocodingData.results[0].components;
    const newLocation = {
      city: cityField.city || cityField.county || cityField.state || cityField.village,
      country: cityField.country,
      coordinates: geocodingData.results[0].geometry,
    };

    dispatch(updateLocation(newLocation));
  };
}

export function getInitialLocation() {
  return async dispatch => {
    const userLocation = await getUserLocation();
    const [lat, lng] = userLocation.loc.split(',').map(el => +el);
    userLocation.coordinates = { lat, lng };
    userLocation.country = countriesMapping[userLocation.country];
    console.log('city', userLocation);
    dispatch(updateLocation(userLocation));
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
