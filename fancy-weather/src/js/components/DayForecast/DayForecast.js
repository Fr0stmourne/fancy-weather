import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getDayOfAWeek, DEFAULT_ICON, displayTemperature } from '../../utils';
import styles from './day-forecast.module.scss';

class DayForecast extends Component {
  render() {
    const temperature = Math.round(displayTemperature(this.props.forecastData.temperatureHigh, this.props.tempScale));
    return (
      <li className={classnames(styles['day-forecast'], this.props.className)}>
        <h3 className="day-forecast__title">{getDayOfAWeek(new Date(this.props.forecastData.time * 1000).getDay())}</h3>
        <div className="day-forecast__temp">{Number.isNaN(temperature) ? undefined : temperature}</div>
        <img
          className={styles['day-forecast__icon']}
          src={`assets/img/${this.props.forecastData.icon || DEFAULT_ICON}.png`}
        ></img>
      </li>
    );
  }
}

DayForecast.propTypes = {
  forecastData: PropTypes.object,
  className: PropTypes.string,
  tempScale: PropTypes.string,
};

export default DayForecast;
