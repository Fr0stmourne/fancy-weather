import { setBackground } from './utils';
import countriesMapping from './countriesMapping';
import { getPhotosJSON, getCoordinatesJSON, getUserLocation, getWeatherJSON } from './apiQueries';

export const UPDATE_FORECAST = 'UPDATE_FORECAST';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_TEMP_SCALE = 'UPDATE_TEMP_SCALE';
export const UPDATE_LANG = 'UPDATE_LANG';
export const UPDATE_PRELOADER_STATUS = 'UPDATE_PRELOADER_STATUS';
export const BG_FETCH_FAIL = 'BG_FETCH_FAIL';
export const BG_FETCH_SUCCESS = 'BG_FETCH_SUCCESS';
export const CITY_FETCH_FAIL = 'CITY_FETCH_FAIL';
export const CITY_FETCH_SUCCESS = 'CITY_FETCH_SUCCESS';

function updateForecast(weather) {
  return {
    type: UPDATE_FORECAST,
    forecastsList: weather.daily.data.slice(0, 3),
    todayForecast: { ...weather.currently, timezone: weather.timezone },
  };
}

export function handleBgFetchFail() {
  return {
    type: BG_FETCH_FAIL,
  };
}

export function handleBgFetchSuccess() {
  return async dispatch => {
    setTimeout(
      () =>
        dispatch({
          type: BG_FETCH_SUCCESS,
        }),
      4500,
    );
  };
}

export function handleDataFetchFail() {
  return {
    type: CITY_FETCH_FAIL,
  };
}

export function handleDataFetchSuccess() {
  return async dispatch => {
    setTimeout(
      () =>
        dispatch({
          type: CITY_FETCH_SUCCESS,
        }),
      4500,
    );
  };
}

export function updatePreloader(booleanStatus) {
  return {
    type: UPDATE_PRELOADER_STATUS,
    isLoading: booleanStatus,
  };
}

export function updateLocation(location) {
  console.log('updating with', location);

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

export function updateWeather() {
  return async (dispatch, getState) => {
    dispatch(updatePreloader(true));
    try {
      console.log(getState());

      const { coordinates } = getState().location;
      const coordinatesStr = `${coordinates.lat}, ${coordinates.lng}`;
      const { language } = getState().appSettings;
      const resp = await getWeatherJSON(coordinatesStr, language);
      const currentLocationWeather = await resp.json();
      dispatch(updateForecast(currentLocationWeather));
    } catch (e) {
      dispatch(handleDataFetchFail());
    } finally {
      dispatch(updatePreloader(false));
      dispatch(handleDataFetchSuccess());
    }
  };
}

export function getLocationInfo(city) {
  return async (dispatch, getState) => {
    dispatch(updatePreloader(true));
    try {
      const { language } = getState().appSettings;
      console.log('city getLocationInfo', city || getState().location.city, language);
      const resp = await getCoordinatesJSON(city || getState().location.city, language);
      const geocodingData = await resp.json();
      const cityField = geocodingData.results[0].components;
      const newLocation = {
        city: cityField.city || cityField.town || cityField.county || cityField.state || cityField.village,
        country: cityField.country,
        coordinates: geocodingData.results[0].geometry,
      };
      dispatch(updateLocation(newLocation));
    } catch (e) {
      dispatch(handleDataFetchFail());
    } finally {
      dispatch(handleDataFetchSuccess());
    }
  };
}

export function getInitialLocation() {
  return async dispatch => {
    try {
      const resp = await getUserLocation();
      const userLocation = await resp.json();
      const [lat, lng] = userLocation.loc.split(',').map(el => +el);
      userLocation.coordinates = { lat, lng };
      userLocation.country = countriesMapping[userLocation.country];
      dispatch(updateLocation(userLocation));
    } catch (e) {
      dispatch(handleDataFetchFail());
    } finally {
      dispatch(handleDataFetchSuccess());
      dispatch(updatePreloader(false));
    }
  };
}

export function updateBackgroundPhoto() {
  return async (dispatch, getState) => {
    dispatch(updatePreloader(true));
    const { icon: weather, time } = getState().todayForecast;
    const monthIndex = new Date(time * 1000).getMonth();
    const currentHour = new Date(time * 1000).getHours();
    try {
      const resp = await getPhotosJSON(weather, monthIndex, currentHour);
      const data = await resp.json();
      const photoLink = data.urls.full;
      await setBackground(photoLink);
    } catch (e) {
      dispatch(handleBgFetchFail());
    } finally {
      dispatch(updatePreloader(false));
      dispatch(handleBgFetchSuccess());
    }
  };
}
