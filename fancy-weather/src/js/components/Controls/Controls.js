import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReloadBtn from '../ReloadBtn/ReloadBtn';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import TempToggler from '../TempToggler/TempToggler';

class Controls extends Component {
  render() {
    return (
      <section className="controls">
        <ReloadBtn
          time={this.props.time}
          weather={this.props.weather}
          location={this.props.location}
          reloadBtnHandler={this.props.reloadBtnHandler}
          className="controls__reload-btn"
        ></ReloadBtn>
        <LangSwitcher></LangSwitcher>
        <TempToggler tempScaleChangeHandler={this.props.tempScaleChangeHandler}></TempToggler>
      </section>
    );
  }
}

Controls.propTypes = {
  className: PropTypes.string,
  reloadBtnHandler: PropTypes.func,
  tempScaleChangeHandler: PropTypes.func,
  location: PropTypes.object,
  weather: PropTypes.string,
  time: PropTypes.number,
};

export default Controls;
