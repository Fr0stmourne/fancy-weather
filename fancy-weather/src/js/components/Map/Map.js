import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, Marker } from 'yandex-map-react';
import styles from './map.module.scss';

class WeatherMap extends Component {
  render() {
    const { lat, lng } = this.props.location.coordinates;
    return (
      <section className={styles.map}>
        <h2 className="map__title visually-hidden">Map</h2>
        <div className={styles.map__container}>
          <Map width={400} height={400} loadOptions={{ lang: 'ru_RU' }} center={[lat, lng]} zoom={10}>
            <Marker lat={lat} lon={lng} />
          </Map>
        </div>

        <div className="map__coordinates">
          <span className={styles['map__coordinates--lat']}>Latitude: {lat.toFixed(2)}</span>
          <span className={styles['map__coordinates--long']}>Longitude: {lng.toFixed(2)}</span>
        </div>
      </section>
    );
  }
}

WeatherMap.propTypes = {
  location: PropTypes.object,
};

export default WeatherMap;
