import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Time from '../Time/Time';
import { displayTemperature } from '../../utils';
import styles from './today-forecast.module.scss';
import translations from '../../translations/translations';

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
    const translationJSON = translations[this.props.appSettings.language];
    return (
      <React.Fragment>
        <h2 className="weather__title">
          {this.props.location.city}, {this.props.location.country}
        </h2>
        <Time
          appSettings={this.props.appSettings}
          time={this.state.time}
          timezone={this.props.todayForecast.timezone}
          language={this.props.appSettings.language}
        />
        <div className={styles.weather__forecast}>
          <div className={styles.weather__temperature}>
            {Math.round(displayTemperature(this.props.todayForecast.temperature, this.props.tempScale))}&deg;
          </div>
          <img src={`assets/img/${this.props.todayForecast.icon}.png`} className={styles.weather__icon} />
          <div className={styles.weather__details}>
            {this.props.todayForecast.summary}
            <p className="weather__feels-like">
              {translationJSON.overcast.feelsLike}:
              {` ${Math.round(displayTemperature(this.props.todayForecast.apparentTemperature, this.props.tempScale))}`}
              &deg;
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
  appSettings: PropTypes.object,
};

export default TodayForecast;
