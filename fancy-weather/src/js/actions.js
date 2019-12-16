import {
  setBackground,
  getUserLocation,
  getWeatherJSON,
  getCoordinatesJSON,
  getTimeOfDay,
  getSeason,
  UNSPLASH_KEY,
  iconWeatherMapping,
} from './utils';
import countriesMapping from './countriesMapping';

export const UPDATE_FORECAST = 'UPDATE_FORECAST';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_TEMP_SCALE = 'UPDATE_TEMP_SCALE';
export const UPDATE_LANG = 'UPDATE_LANG';
export const UPDATE_PRELOADER_STATUS = 'UPDATE_PRELOADER_STATUS';
export const BG_FETCH_FAIL = 'BG_FETCH_FAIL';
export const BG_FETCH_SUCCESS = 'BG_FETCH_SUCCESS';

function updateForecast(weather) {
  return {
    type: UPDATE_FORECAST,
    forecastsList: weather.daily.data.slice(0, 3),
    todayForecast: { ...weather.currently, timezone: weather.timezone },
  };
}

export async function getPhotosJSON(weather, month, hour) {
  const season = getSeason(month);
  const timeOfDay = getTimeOfDay(hour);
  const defaultWeather = 'clear';
  return fetch(
    `https://api.unsplash.com/photos/random?query=${season}+nature+${timeOfDay}+${iconWeatherMapping[weather] ||
      defaultWeather}&client_id=${UNSPLASH_KEY}`,
  );
}

export function updatePreloader(booleanStatus) {
  return {
    type: UPDATE_PRELOADER_STATUS,
    isLoading: booleanStatus,
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

export function handleFetchFail() {
  return {
    type: BG_FETCH_FAIL,
  };
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
    try {
      const resp = await getPhotosJSON(weather, monthIndex, currentHour);
      const data = await resp.json();
      const photoLink = data.urls.full;
      setBackground(photoLink);
    } catch (e) {
      dispatch(handleFetchFail());
    } finally {
      dispatch(updatePreloader(false));
      setTimeout(() => {
        dispatch({
          type: BG_FETCH_SUCCESS,
        });
      }, 4500);
    }
  };
}
