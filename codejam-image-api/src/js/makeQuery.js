const ACCESS_KEY = '79060e7faaa2c684952c28824dc484ca9ce148b44f17f43a75f5137def261120';

export default async function makeQuery(town = 'st-petersburg') {
  let apiData;
  try {
    apiData = await fetch(
      `https://api.unsplash.com/photos/random?query=town,${town}&client_id=${ACCESS_KEY}`,
    );
  } catch (e) {
    throw new Error(e);
  }
  return apiData.json();
}
