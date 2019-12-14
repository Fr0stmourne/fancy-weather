import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getDayOfAWeek, DEFAULT_ICON, displayTemperature } from '../../utils';
import styles from './day-forecast.module.scss';

function DayForecast(props) {
  const temperature = Math.round(displayTemperature(props.forecastData.temperatureHigh, props.tempScale));
  return (
    <li className={classnames(styles['day-forecast'], props.className)}>
      <h3 className="day-forecast__title">
        {getDayOfAWeek(new Date(props.forecastData.time * 1000).getDay(), props.appSettings.language)}
      </h3>
      <div className={styles['day-forecast__temp']}>{Number.isNaN(temperature) ? undefined : temperature}&deg;</div>
      <img
        className={styles['day-forecast__icon']}
        src={`assets/img/${props.forecastData.icon || DEFAULT_ICON}.png`}
      ></img>
    </li>
  );
}

DayForecast.propTypes = {
  forecastData: PropTypes.object,
  className: PropTypes.string,
  tempScale: PropTypes.string,
  appSettings: PropTypes.object,
};

export default DayForecast;
