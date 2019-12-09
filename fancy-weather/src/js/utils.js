const ACCESS_PHOTOS_KEY = '5cb2e43d6429d9be2ec68ef4f1bd86e3';
const ACCESS_WEATHER_KEY = '19d9bc6a1e14802827f4384c9bacfa45';
const ACCESS_GEOCODING_KEY = '89f190daada24d6b9f13b38376d75c02';
const ACCESS_IP_KEY = '94fe768a1c789c';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DEFAULT_ICON = 'thermometer';

export function getDayOfAWeek(dayIndex) {
  return weekDays[dayIndex];
}

export function getMonthName(monthIndex) {
  return months[monthIndex];
}

async function queryTemplate(link) {
  let apiData;
  try {
    apiData = await fetch(link);
  } catch (e) {
    throw new Error(e);
  }
  console.log(await apiData.json());
  return apiData.json();
}

export function setBackground(link) {
  document.body.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.3),
  rgba(0,0,0,0.3)), url(${link})`;
}

export function getCoordsObjFromString(locationString) {
  const [lat, lng] = locationString.split(',').map(el => +el);
  return {
    lat,
    lng,
  };
}

export async function getPhotosJSON(weather = 'rainy') {
  return queryTemplate(
    `${proxyURL}https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ACCESS_PHOTOS_KEY}&nojsoncallback=1&format=json&tags=${weather}&extras=url_h`,
  );
}

export async function getWeatherJSON(coords, tempScale) {
  return queryTemplate(
    `${proxyURL}https://api.darksky.net/forecast/${ACCESS_WEATHER_KEY}/${coords}?lang=ru&units=${tempScale}`,
  );
}

export async function getCoordinatesJSON(city = 'saint-petersburg') {
  return queryTemplate(
    `${proxyURL}https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${ACCESS_GEOCODING_KEY}&pretty=1&no_annotations=1&language=en`,
  );
}

export async function getUserLocation() {
  return queryTemplate(`${proxyURL}https://ipinfo.io/json?token=${ACCESS_IP_KEY}`);
}
