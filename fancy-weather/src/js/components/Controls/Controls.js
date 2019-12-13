import React from 'react';
import PropTypes from 'prop-types';
import ReloadBtn from '../ReloadBtn/ReloadBtn';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import TempToggler from '../TempToggler/TempToggler';
import styles from './controls.module.scss';

function Controls(props) {
  return (
    <section className={styles.controls}>
      <ReloadBtn
        time={props.time}
        weather={props.weather}
        location={props.location}
        reloadBtnHandler={props.reloadBtnHandler}
        className={styles['controls__reload-btn']}
      ></ReloadBtn>
      <LangSwitcher
        langChangeHandler={props.langChangeHandler}
        language={props.appSettings.language}
        className={styles['controls__lang-switcher']}
      ></LangSwitcher>
      <TempToggler
        tempScale={props.appSettings.tempScale}
        tempScaleChangeHandler={props.tempScaleChangeHandler}
        className={styles['controls__temp-toggler']}
      ></TempToggler>
    </section>
  );
}

Controls.propTypes = {
  className: PropTypes.string,
  reloadBtnHandler: PropTypes.func,
  langChangeHandler: PropTypes.func,
  tempScaleChangeHandler: PropTypes.func,
  location: PropTypes.object,
  weather: PropTypes.string,
  time: PropTypes.number,
  language: PropTypes.string,
  appSettings: PropTypes.object,
};

export default Controls;
