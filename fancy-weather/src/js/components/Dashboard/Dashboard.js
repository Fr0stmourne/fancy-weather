import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TodayForecast from '../TodayForecast/TodayForecast';
import DayForecast from '../DayForecast/DayForecast';
import styles from './dashboard.module.scss';

class Dashboard extends Component {
  render() {
    return (
      <section className="app__weather weather">
        <TodayForecast
          tempScale={this.props.appSettings.tempScale}
          onTimeTick={this.props.onTimeTick}
          location={this.props.location}
          todayForecast={this.props.todayForecast}
        ></TodayForecast>
        <ul className={styles['weather__forecast-list']}>
          {this.props.futureForecasts.map((el, index) => (
            <DayForecast
              tempScale={this.props.appSettings.tempScale}
              className={classnames(styles['weather__forecast-item'], this.props.className)}
              forecastData={el}
              key={index}
            ></DayForecast>
          ))}
        </ul>
      </section>
    );
  }
}

Dashboard.propTypes = {
  futureForecasts: PropTypes.array,
  todayForecast: PropTypes.object,
  onTimeTick: PropTypes.func,
  className: PropTypes.string,
  location: PropTypes.object,
  appSettings: PropTypes.object,
};

export default Dashboard;
