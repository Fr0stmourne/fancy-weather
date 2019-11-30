const ACCESS_KEY = '5cb2e43d6429d9be2ec68ef4f1bd86e3';
const town = 'paris';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

async function getWeatherJSON() {
  let apiData;
  try {
    apiData = await fetch(`${proxyURL}https://api.flickr.com/services/feeds/photos_public.gne?method=flickr.photos.getPopular&nojsoncallback=1&format=json&tags=${town}`, {
      headers: {
        api_key: ACCESS_KEY,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
  return apiData.json();
}

export default getWeatherJSON;
