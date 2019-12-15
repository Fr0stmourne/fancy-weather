import translations from './translations/translations';

const ACCESS_PHOTOS_KEY = '5cb2e43d6429d9be2ec68ef4f1bd86e3';
// const UNSPLASH_KEY = `bbd7d091469d1bb74d894f08f1ef8a5d2cbd36a1ad3a02f712e4354c909d7d9a`;
const ACCESS_WEATHER_KEY = '19d9bc6a1e14802827f4384c9bacfa45';
const ACCESS_GEOCODING_KEY = '89f190daada24d6b9f13b38376d75c02';
const ACCESS_IP_KEY = '94fe768a1c789c';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

export const iconWeatherMapping = {
  'clear-day': 'clear',
  'clear-night': 'clear,night',
  cloudy: 'cloudy',
  fog: 'fog',
  hail: 'hail',
  'partly-cloudy-night': 'cloudy,night',
  'partly-cloudy-day': 'cloudy,day',
  rain: 'rain',
  sleet: 'sleet',
  snow: 'snow',
  thunderstorm: 'thunderstorm',
  tornado: 'tornado',
  wind: 'wind',
};

export const langMapping = {
  en: 'en_RU',
  ru: 'ru_RU',
};

function getSeason(monthIndex) {
  switch (monthIndex) {
    case 11:
    case 0:
    case 1:
      return 'winter';
    case 2:
    case 3:
    case 4:
      return 'spring';
    case 5:
    case 6:
    case 7:
      return 'summer';
    case 8:
    case 9:
    case 10:
      return 'fall';
    default:
      return 'unknown season';
  }
}

export const DEFAULT_SCALE = 'C';
export const DEFAULT_LANG = 'en';

export const DEFAULT_ICON = 'thermometer';

export function getDayOfAWeek(dayIndex, language) {
  return translations[language].days[dayIndex];
}

export function getTimeOfDay(hour) {
  if ((hour >= 0 && hour <= 5) || hour >= 22) return 'night';
  if (hour > 5 && hour <= 11) return 'morning';
  if (hour > 11 && hour <= 15) return 'afternoon';
  return 'evening';
}

export function getMonthName(monthIndex, language) {
  return translations[language].months[monthIndex];
}

async function queryTemplate(link) {
  let apiData;
  try {
    apiData = await fetch(link);
  } catch (e) {
    throw new Error(e);
  }
  return apiData.json();
}

export function setBackground(link) {
  document.body.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.5),
  rgba(0,0,0,0.5)), url(${link})`;
}

export function getCoordsObjFromString(locationString) {
  const [lat, lng] = locationString.split(',').map(el => +el);
  return {
    lat,
    lng,
  };
}

function convertToFahr(celsTemp) {
  return (celsTemp * 9) / 5 + 32;
}

export function displayTemperature(celsTemp, tempScale) {
  return tempScale === DEFAULT_SCALE ? celsTemp : convertToFahr(celsTemp);
}

export async function getPhotosJSON(weather, month, hour, { lat, lng }) {
  const season = getSeason(month);
  const timeOfDay = getTimeOfDay(hour);
  const defaultWeather = 'clear';
  console.log(
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ACCESS_PHOTOS_KEY}&tag_mode=any&nojsoncallback=1&format=json&lat=${lat}&lon=${lng}&accuracy=3&extras=url_h&tags=${iconWeatherMapping[
      weather
    ] || defaultWeather},${season},${timeOfDay}`,
  );

  return queryTemplate(
    `${proxyURL}https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ACCESS_PHOTOS_KEY}&tag_mode=any&nojsoncallback=1&format=json&lat=${lat}&lon=${lng}&accuracy=3&extras=url_h&tags=${iconWeatherMapping[
      weather
    ] || defaultWeather},${season},${timeOfDay}`,
  );
}

export async function getWeatherJSON(coords, lang = 'en') {
  return queryTemplate(
    `${proxyURL}https://api.darksky.net/forecast/${ACCESS_WEATHER_KEY}/${coords}?lang=${lang}&units=si`,
  );
}

export async function getCoordinatesJSON(city = 'saint-petersburg', lang = 'en') {
  return queryTemplate(
    `${proxyURL}https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${ACCESS_GEOCODING_KEY}&pretty=1&no_annotations=1&language=${lang}`,
  );
}

export async function getUserLocation() {
  return queryTemplate(`${proxyURL}https://ipinfo.io/json?token=${ACCESS_IP_KEY}`);
}
