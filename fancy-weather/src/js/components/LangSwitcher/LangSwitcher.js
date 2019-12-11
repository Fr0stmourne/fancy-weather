import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LangSwitcher extends Component {
  render() {
    return (
      <select
        defaultValue={this.props.language}
        onChange={e => this.props.langChangeHandler(e.target.value)}
        name=""
        id=""
        className="controls__lang"
      >
        <option value="en">En</option>
        <option value="ru">Ru</option>
        <option value="be">Be</option>
      </select>
    );
  }
}

LangSwitcher.propTypes = {
  langChangeHandler: PropTypes.func,
  language: PropTypes.string,
};

export default LangSwitcher;
