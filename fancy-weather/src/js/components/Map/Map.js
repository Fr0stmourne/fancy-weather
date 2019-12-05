import React, { Component } from 'react';
import styles from './map.module.scss';

console.log(styles.map__container);

class Map extends Component {
  render() {
    return (
      <section className="app__map map">
        <h2 className="map__title visually-hidden">Map</h2>
        <div id="map-container" className={styles.red}></div>
        <div className="map__coordinates">
          <span className="map__coordinates--lat">Latitude: 53 54</span>
          <span className="map__coordinates--long">Longitude: 23 73</span>
        </div>
      </section>
    );
  }
}

export default Map;
