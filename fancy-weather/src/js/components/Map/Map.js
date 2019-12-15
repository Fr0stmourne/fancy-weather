import React from 'react';
import PropTypes from 'prop-types';
// import { Map, Marker } from 'yandex-map-react';
import { Map } from 'react-yandex-maps';
import styles from './map.module.scss';
import translations from '../../translations/translations';

const SEPARATOR = '.';

function formatCoords(coordinate) {
  const coordinatesArr = coordinate.toString().split(SEPARATOR);
  return `${coordinatesArr[0]}°${coordinatesArr[1]}'`;
}

// const langMapping = {
//   'en': 'en'
// }

function WeatherMap(props) {
  const { lat, lng } = props.location.coordinates;
  const translationJSON = translations[props.appSettings.language];
  return (
    <section className={styles.map}>
      <h2 className="map__title visually-hidden">Map</h2>
      <Map className={styles.map__container} state={{ center: [lat.toFixed(2), lng.toFixed(2)], zoom: 9 }}></Map>

      <div className={styles.map__coordinates}>
        <span className={styles['map__coordinates--lat']}>
          {translationJSON.location.lat}: {formatCoords(lat.toFixed(2))}
        </span>
        <span className={styles['map__coordinates--long']}>
          {translationJSON.location.lng}: {formatCoords(lng.toFixed(2))}
        </span>
      </div>
    </section>
  );
}

WeatherMap.propTypes = {
  location: PropTypes.object,
  appSettings: PropTypes.object,
};

export default WeatherMap;
