import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { getDayOfAWeek, getMonthName } from '../../utils';

function Time(props) {
  const currentTimeDate = new Date(props.time * 1000);
  const localizedTime = currentTimeDate.toLocaleString({}, { timeZone: props.timezone }).split(' ')[1];

  return (
    <React.Fragment>
      <p className="weather__day">
        {`${getDayOfAWeek(
          currentTimeDate.getDay(),
          props.appSettings.language,
        )} ${currentTimeDate.getDate()} ${getMonthName(currentTimeDate.getMonth(), props.appSettings.language)}`}
      </p>
      <time className="weather__time">{localizedTime}</time>
    </React.Fragment>
  );
}

Time.propTypes = {
  className: PropTypes.string,
  time: PropTypes.number,
  timezone: PropTypes.string,
  appSettings: PropTypes.object,
};

export default Time;
