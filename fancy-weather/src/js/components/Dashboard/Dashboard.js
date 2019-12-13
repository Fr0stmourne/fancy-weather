import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TodayForecast from '../TodayForecast/TodayForecast';
import DayForecast from '../DayForecast/DayForecast';
import styles from './dashboard.module.scss';

function Dashboard(props) {
  return (
    <section className="app__weather weather">
      <TodayForecast
        tempScale={props.appSettings.tempScale}
        onTimeTick={props.onTimeTick}
        location={props.location}
        todayForecast={props.todayForecast}
      ></TodayForecast>
      <ul className={styles['weather__forecast-list']}>
        {props.futureForecasts.map((el, index) => (
          <DayForecast
            tempScale={props.appSettings.tempScale}
            className={classnames(styles['weather__forecast-item'], props.className)}
            forecastData={el}
            key={index}
          ></DayForecast>
        ))}
      </ul>
    </section>
  );
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
