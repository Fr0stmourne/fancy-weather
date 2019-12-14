import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker } from 'yandex-map-react';
import styles from './map.module.scss';
import translations from '../../translations/translations';

const SEPARATOR = '.';

function formatCoords(coordinate) {
  const coordinatesArr = coordinate.toString().split(SEPARATOR);
  return `${coordinatesArr[0]}°${coordinatesArr[1]}'`;
}

function WeatherMap(props) {
  const { lat, lng } = props.location.coordinates;
  const translationJSON = translations[props.appSettings.language];
  return (
    <section className={styles.map}>
      <h2 className="map__title visually-hidden">Map</h2>
      <div className={styles.map__container}>
        <Map width={400} height={400} loadOptions={{ lang: 'ru_RU' }} center={[lat, lng]} zoom={10}>
          <Marker lat={lat} lon={lng} />
        </Map>
      </div>

      <div className="map__coordinates">
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
