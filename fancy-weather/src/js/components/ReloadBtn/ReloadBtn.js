import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './reload-btn.module.scss';

function ReloadBtn(props) {
  const currentMonth = new Date(props.time * 1000).getMonth();
  return (
    <button
      onClick={() => props.reloadBtnHandler(props.weather, currentMonth, props.location.coordinates)}
      className={classNames(styles['reload-btn'], props.className)}
    >
      <span className="visually-hidden">Reload</span>
    </button>
  );
}

ReloadBtn.propTypes = {
  className: PropTypes.string,
  reloadBtnHandler: PropTypes.func,
  weather: PropTypes.string,
  location: PropTypes.object,
  time: PropTypes.number,
};

export default ReloadBtn;
