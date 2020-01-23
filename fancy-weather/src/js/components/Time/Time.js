import React from 'react';
import PropTypes from 'prop-types';
import { localizeDate } from '../../utils';
// import classNames from 'classnames';
// import { getDayOfAWeek, getMonthName } from '../../utils';

function Time(props) {
  const { date, time } = localizeDate(props.time, props.timezone, props.language);

  return (
    <React.Fragment>
      <p className="weather__day">{date}</p>
      <time className="weather__time">{time}</time>
    </React.Fragment>
  );
}

Time.propTypes = {
  className: PropTypes.string,
  time: PropTypes.number,
  timezone: PropTypes.string,
  language: PropTypes.string,
  appSettings: PropTypes.shape({
    language: PropTypes.string,
    tempScale: PropTypes.string,
  }),
};

export default Time;
