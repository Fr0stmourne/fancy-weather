// const ACCESS_PHOTOS_KEY = '5cb2e43d6429d9be2ec68ef4f1bd86e3';

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

export function getSeason(monthIndex) {
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

export function getTimeOfDay(hour) {
  if (typeof hour !== 'number') throw new Error('Incorrect data type');
  if ((hour >= 0 && hour <= 5) || hour >= 22) return 'night';
  if (hour > 5 && hour <= 11) return 'morning';
  if (hour > 11 && hour <= 15) return 'day';
  return 'evening';
}

export function capitalizeEach(string) {
  if (typeof string !== 'string') throw new Error('Incorrect data type');
  return string
    .split(' ')
    .map(el => `${el[0].toUpperCase()}${el.slice(1)}`)
    .join(' ');
}

export function localizeDate(timestamp, timezone, language) {
  const langMap = {
    en: 'en-US',
    ru: 'ru-RU',
  };

  const currentTimeDate = new Date(timestamp * 1000);
  const localizedTime = currentTimeDate.toLocaleString({}, { timeZone: timezone, timeStyle: 'medium' });
  const localizedDate = capitalizeEach(
    currentTimeDate.toLocaleString(langMap[language], {
      timeZone: timezone,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }),
  );
  const dayOfWeek = capitalizeEach(
    currentTimeDate.toLocaleString(langMap[language], {
      timeZone: timezone,
      weekday: 'long',
    }),
  );
  return {
    time: localizedTime,
    date: localizedDate,
    day: dayOfWeek,
  };
}

export function setBackground(blob) {
  document.body.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.5),
  rgba(0,0,0,0.5)), url(${URL.createObjectURL(blob)})`;
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
