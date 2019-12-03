import React, { Component } from 'react';
import TodayForecast from '../TodayForecast/TodayForecast';
import DayForecast from '../DayForecast/DayForecast';

class Dashboard extends Component {
  render() {
    return (
      <section className="app__weather weather">
        <TodayForecast></TodayForecast>
        <ul className="weather__forecast-list">
          <DayForecast></DayForecast>
          <DayForecast></DayForecast>
          <DayForecast></DayForecast>
        </ul>
      </section>
    );
  }
}

export default Dashboard;
