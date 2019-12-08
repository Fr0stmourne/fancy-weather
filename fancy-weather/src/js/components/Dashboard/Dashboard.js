import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodayForecast from '../TodayForecast/TodayForecast';
import DayForecast from '../DayForecast/DayForecast';
import styles from './dashboard.module.scss';

class Dashboard extends Component {
  render() {
    console.log(this.props.todayForecast);
    return (
      <section className="app__weather weather">
        <TodayForecast todayForecast={this.props.todayForecast}></TodayForecast>
        <ul className={styles['weather__forecast-list']}>
          {this.props.futureForecasts.map((el, index) => (
            <DayForecast className={styles['weather__forecast-item']} forecastData={el} key={index}></DayForecast>
          ))}
        </ul>
      </section>
    );
  }
}

Dashboard.propTypes = {
  futureForecasts: PropTypes.array,
  todayForecast: PropTypes.object,
};

export default Dashboard;
