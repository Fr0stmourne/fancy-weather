import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TempToggler extends Component {
  render() {
    return (
      <select
        defaultValue={this.props.tempScale}
        onChange={e => this.props.tempScaleChangeHandler(e.target.value)}
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
  tempScale: PropTypes.string,
};

export default TempToggler;
