import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReloadBtn from '../ReloadBtn/ReloadBtn';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import TempToggler from '../TempToggler/TempToggler';
import styles from './controls.module.scss';

class Controls extends Component {
  render() {
    return (
      <section className={styles.controls}>
        <ReloadBtn
          time={this.props.time}
          weather={this.props.weather}
          location={this.props.location}
          reloadBtnHandler={this.props.reloadBtnHandler}
          className={styles['controls__reload-btn']}
        ></ReloadBtn>
        <LangSwitcher
          langChangeHandler={this.props.langChangeHandler}
          language={this.props.appSettings.language}
          className={styles['controls__lang-switcher']}
        ></LangSwitcher>
        <TempToggler
          tempScale={this.props.appSettings.tempScale}
          tempScaleChangeHandler={this.props.tempScaleChangeHandler}
          className={styles['controls__temp-toggler']}
        ></TempToggler>
      </section>
    );
  }
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
