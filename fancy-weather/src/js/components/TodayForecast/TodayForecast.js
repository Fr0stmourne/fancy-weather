import React, { Component } from 'react';
import PropTypes from 'prop-types';
import countriesMapping from '../../countriesMapping';
import { getDayOfAWeek, getMonthName } from '../../utils';

class TodayForecast extends Component {
  render() {
    const currentTimeDate = new Date(this.props.todayForecast.time * 1000);
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
        <time className="weather__time">
          {/* add day formatting func cuz it can be like 15:5 instead of 15:05 */}
          {currentTimeDate.getHours()}:{currentTimeDate.getMinutes()}
        </time>
        <div className="weather__forecast">
          <div className="weather__temperature"></div>
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
};

export default TodayForecast;
