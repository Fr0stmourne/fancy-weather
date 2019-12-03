import React, { Component } from 'react';

class TodayForecast extends Component {
  render() {
    return (
      <React.Fragment>
        <h2 className="weather__title">Minsk, Belarus</h2>
        <time className="weather__day">Mon 28 October</time>
        <time className="weather__time">17:30</time>
        <div className="weather__forecast">
          <div className="weather__temperature">10</div>
          <div className="weather__details">
            Overcast
            <p className="weather__feels-like">Feels like: 7</p>
            <p className="weather__wind">2 m/s</p>
            <p className="weather__humidity">83%</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TodayForecast;
