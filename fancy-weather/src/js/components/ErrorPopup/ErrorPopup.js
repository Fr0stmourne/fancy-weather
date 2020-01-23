import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './error-popup.module.scss';
import translations from '../../translations/translations';

function ErrorPopup(props) {
  return (
    <div
      className={classnames(
        styles['error-popup'],
        props.isHidden ? '' : styles['error-popup--bubble'],
        styles[`error-popup--${props.popupFor}`],
      )}
      id="error-popup"
    >
      {translations[props.appSettings.language].errors[props.popupFor]}
    </div>
  );
}

ErrorPopup.propTypes = {
  isHidden: PropTypes.bool,
  popupFor: PropTypes.string,
  className: PropTypes.string,
  appSettings: PropTypes.shape({
    language: PropTypes.string,
    tempScale: PropTypes.string,
  }),
};

export default ErrorPopup;
