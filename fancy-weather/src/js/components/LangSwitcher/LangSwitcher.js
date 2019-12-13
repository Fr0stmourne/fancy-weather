import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './lang-switcher.module.scss';

function LangSwitcher(props) {
  return (
    <select
      defaultValue={props.language}
      onChange={e => props.langChangeHandler(e.target.value)}
      name=""
      id=""
      className={classnames(styles.select, props.className)}
    >
      <option value="en">En</option>
      <option value="ru">Ru</option>
      <option value="be">Be</option>
    </select>
  );
}

LangSwitcher.propTypes = {
  langChangeHandler: PropTypes.func,
  language: PropTypes.string,
  className: PropTypes.string,
};

export default LangSwitcher;
