import React, { Component } from 'react';
import PropTypes from 'prop-types';
import countriesMapping from '../../countriesMapping';
import { getDayOfAWeek, getMonthName, DEFAULT_ICON } from '../../utils';
import styles from './today-forecast.module.scss';

class TodayForecast extends Component {
  componentDidMount() {
    this.time = setInterval(this.props.onTimeTick, 1000);
  }

  render() {
    const currentTimeDate = new Date(this.props.todayForecast.time * 1000);
    const localizedTime = currentTimeDate
      .toLocaleString({}, { timeZone: this.props.todayForecast.timezone })
      .split(' ')[1];
    return (
      <React.Fragment>
        <h2 className="weather__title">
          {this.props.location.city}, {countriesMapping[this.props.location.country]}
        </h2>
        <p className="weather__day">
          {`${getDayOfAWeek(currentTimeDate.getDay())} ${currentTimeDate.getDate()} ${getMonthName(
            currentTimeDate.getMonth(),
          )}`}
        </p>
        <time className="weather__time">{localizedTime}</time>
        <div className="weather__forecast">
          <div className="weather__temperature">{Math.round(this.props.todayForecast.temperature)}</div>
          <img
            src={`assets/img/${this.props.todayForecast.icon || DEFAULT_ICON}.png`}
            className={styles.weather__icon}
          />
          <div className="weather__details">
            Overcast
            <p className="weather__feels-like">
              Feels like: {Math.round(this.props.todayForecast.apparentTemperature)}
            </p>
            <p className="weather__wind">{Math.round(this.props.todayForecast.windSpeed)} m/s</p>
            <p className="weather__humidity">{this.props.todayForecast.humidity * 100}%</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

TodayForecast.propTypes = {
  location: PropTypes.object,
  todayForecast: PropTypes.object,
  onTimeTick: PropTypes.func,
};

export default TodayForecast;
