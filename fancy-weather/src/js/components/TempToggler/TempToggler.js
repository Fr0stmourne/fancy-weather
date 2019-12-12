import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './temp-toggler.module.scss';

class TempToggler extends Component {
  render() {
    return (
      <select
        defaultValue={this.props.tempScale}
        onChange={e => this.props.tempScaleChangeHandler(e.target.value)}
        name=""
        id=""
        className={classnames(styles['temp-toggler'], this.props.className)}
      >
        <option value="C">C&deg;</option>
        <option value="F">F&deg;</option>
      </select>
    );
  }
}

TempToggler.propTypes = {
  tempScaleChangeHandler: PropTypes.func,
  tempScale: PropTypes.string,
  className: PropTypes.string,
};

export default TempToggler;
