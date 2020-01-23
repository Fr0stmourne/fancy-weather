import { getTimeOfDay, getSeason, iconWeatherMapping } from './utils';

const UNSPLASH_KEY = `bbd7d091469d1bb74d894f08f1ef8a5d2cbd36a1ad3a02f712e4354c909d7d9a`;
const ACCESS_WEATHER_KEY = '19d9bc6a1e14802827f4384c9bacfa45';
const ACCESS_GEOCODING_KEY = '89f190daada24d6b9f13b38376d75c02';
const ACCESS_IP_KEY = '94fe768a1c789c';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

export function getPhotosJSON(weather, month, hour) {
  const season = getSeason(month);
  const timeOfDay = getTimeOfDay(hour);
  const defaultWeather = 'clear';
  return fetch(
    `https://api.unsplash.com/photos/random?query=${season}+nature+${timeOfDay}+${iconWeatherMapping[weather] ||
      defaultWeather}&client_id=${UNSPLASH_KEY}`,
  );
}

export function getCoordinatesJSON(city = 'saint-petersburg', lang = 'en') {
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${ACCESS_GEOCODING_KEY}&pretty=1&no_annotations=1&language=${lang}`,
  );
}

export function getWeatherJSON(coords, lang = 'en') {
  return fetch(`${proxyURL}https://api.darksky.net/forecast/${ACCESS_WEATHER_KEY}/${coords}?lang=${lang}&units=si`);
}

export function getUserLocation() {
  return fetch(`${proxyURL}https://ipinfo.io/json?token=${ACCESS_IP_KEY}`);
}
