import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReloadBtn from '../ReloadBtn/ReloadBtn';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import TempToggler from '../TempToggler/TempToggler';

class Controls extends Component {
  render() {
    return (
      <section className="controls">
        <ReloadBtn reloadBtnHandler={this.props.reloadBtnHandler} className="controls__reload-btn"></ReloadBtn>
        <LangSwitcher></LangSwitcher>
        <TempToggler></TempToggler>
      </section>
    );
  }
}

Controls.propTypes = {
  className: PropTypes.string,
  reloadBtnHandler: PropTypes.func,
};

export default Controls;
