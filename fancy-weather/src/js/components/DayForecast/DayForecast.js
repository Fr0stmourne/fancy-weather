import React, { Component } from 'react';

class DayForecast extends Component {
  render() {
    return (
      <li className="weather__day-forecast day-forecast">
        <h3 className="day-forecast__title">Wednesday</h3>
        <div className="day_temp">6</div>
      </li>
    );
  }
}

export default DayForecast;
