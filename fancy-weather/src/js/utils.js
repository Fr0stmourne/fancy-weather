const ACCESS_KEY = '5cb2e43d6429d9be2ec68ef4f1bd86e3';
// const tags = 'downpour';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

async function getPhotoLink(weather, location) {
  let apiData;
  try {
    apiData = await fetch(`${proxyURL}https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${ACCESS_KEY}&nojsoncallback=1&format=json&tags=${weather},${location}&extras=url_h`);
  } catch (e) {
    throw new Error(e);
  }
  return apiData.json();
}

export default getPhotoLink;
