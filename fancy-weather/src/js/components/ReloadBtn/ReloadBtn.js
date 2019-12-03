import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReloadBtn extends Component {
  render() {
    return <button className={`reload-btn ${this.props.className || ''}`}>Reload</button>;
  }
}

ReloadBtn.propTypes = {
  className: PropTypes.string,
};

export default ReloadBtn;
