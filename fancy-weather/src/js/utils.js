const ACCESS_PHOTOS_KEY = '5cb2e43d6429d9be2ec68ef4f1bd86e3';
const ACCESS_WEATHER_KEY = '19d9bc6a1e14802827f4384c9bacfa45';
const ACCESS_GEOCODING_KEY = '89f190daada24d6b9f13b38376d75c02';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

export async function getPhotosJSON(weather = 'rainy', location = '') {
  let apiData;
  try {
    console.log(weather, location);
    apiData = await fetch(
      `${proxyURL}https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ACCESS_PHOTOS_KEY}&nojsoncallback=1&format=json&tags=${weather}&extras=url_h`,
    );
  } catch (e) {
    throw new Error(e);
  }
  return apiData.json();
}

export function setBackground(link) {
  document.body.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.3),
  rgba(0,0,0,0.3)), url(${link})`;
}

export async function getWeatherJSON(coords = '59.929227, 30.3294354') {
  let apiData;
  try {
    apiData = await fetch(`${proxyURL}https://api.darksky.net/forecast/${ACCESS_WEATHER_KEY}/${coords}?lang=ru`);
  } catch (e) {
    throw new Error(e);
  }
  return apiData.json();
}

export async function getCoordinatesJSON(city = 'saint-petersburg') {
  let apiData;
  try {
    apiData = await fetch(
      `${proxyURL}https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${ACCESS_GEOCODING_KEY}&pretty=1&no_annotations=1`,
    );
  } catch (e) {
    throw new Error(e);
  }
  return apiData.json();
}
