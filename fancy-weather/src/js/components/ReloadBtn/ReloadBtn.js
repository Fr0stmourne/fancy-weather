import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './reload-btn.module.scss';

function ReloadBtn(props) {
  return (
    <button
      onClick={() => props.reloadBtnHandler(props.weather, props.time, props.location.coordinates)}
      className={classNames(styles['reload-btn'], props.className)}
    >
      Reload
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
