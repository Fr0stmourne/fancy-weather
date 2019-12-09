import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TempToggler extends Component {
  constructor(props) {
    super(props);
    this.selectRef = React.createRef();
  }

  render() {
    return (
      <select
        ref={this.selectRef}
        onChange={() => {
          console.log('triggered', this.selectRef.current.value);
          this.props.tempScaleChangeHandler(this.selectRef.current.value);
        }}
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
