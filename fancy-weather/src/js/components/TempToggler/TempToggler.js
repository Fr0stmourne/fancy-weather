import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_SCALE } from '../../utils';

class TempToggler extends Component {
  state = {
    selectValue: DEFAULT_SCALE,
  };

  handleChange(evt) {
    this.setState(
      {
        selectValue: evt.target.value,
      },
      () => {
        this.props.tempScaleChangeHandler(this.state.selectValue);
      },
    );
  }

  render() {
    return (
      <select
        value={this.state.selectValue}
        onChange={e => this.handleChange(e)}
        name=""
        id=""
        className="controls__temp"
      >
        <option value="C">C</option>
        <option value="F">F</option>
      </select>
    );
  }
}

TempToggler.propTypes = {
  tempScaleChangeHandler: PropTypes.func,
};

export default TempToggler;
