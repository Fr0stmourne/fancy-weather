import React, { Component } from 'react';
import ReloadBtn from '../ReloadBtn/ReloadBtn';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import TempToggler from '../TempToggler/TempToggler';

class Controls extends Component {
  render() {
    return (
      <section className="controls">
        <ReloadBtn className="controls__reload-btn"></ReloadBtn>
        <LangSwitcher></LangSwitcher>
        <TempToggler></TempToggler>
      </section>
    );
  }
}

export default Controls;
