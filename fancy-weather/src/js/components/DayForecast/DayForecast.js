import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DEFAULT_ICON, displayTemperature, localizeDate } from '../../utils';
import styles from './day-forecast.module.scss';

function DayForecast(props) {
  const temperature = Math.round(displayTemperature(props.forecastData.temperatureHigh, props.tempScale));
  const { day } = localizeDate(props.forecastData.time, props.timezone, props.appSettings.language);
  return (
    <li className={classnames(styles['day-forecast'], props.className)}>
      <h3 className="day-forecast__title">{day}</h3>
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
  time: PropTypes.number,
  timezone: PropTypes.string,
};

export default DayForecast;
