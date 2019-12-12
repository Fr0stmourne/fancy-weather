import React, { Component } from 'react';
import PropTypes from 'prop-types';
import countriesMapping from '../../countriesMapping';
import { getDayOfAWeek, getMonthName, displayTemperature } from '../../utils';
import styles from './today-forecast.module.scss';

class TodayForecast extends Component {
  state = {
    time: this.props.todayForecast.time,
  };

  tick = () => {
    this.setState(state => ({
      time: state.time + 1,
    }));
  };

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.todayForecast.time !== prevProps.todayForecast.time) {
      this.setState({
        time: this.props.todayForecast.time,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const currentTimeDate = new Date(this.state.time * 1000);
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
          <div className="weather__temperature">
            {Math.round(displayTemperature(this.props.todayForecast.temperature, this.props.tempScale))}
          </div>
          <img src={`assets/img/${this.props.todayForecast.icon}.png`} className={styles.weather__icon} />
          <div className="weather__details">
            Overcast
            <p className="weather__feels-like">
              Feels like:
              {` ${Math.round(displayTemperature(this.props.todayForecast.apparentTemperature, this.props.tempScale))}`}
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
  tempScale: PropTypes.string,
};

export default TodayForecast;
