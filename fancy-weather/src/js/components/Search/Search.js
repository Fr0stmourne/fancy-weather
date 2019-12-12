import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './search.module.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
  }

  render() {
    return (
      <section className={styles.search}>
        <input
          placeholder={'Search city'}
          ref={this.searchInputRef}
          className={styles.search__input}
          type="search"
          name="location"
          id="search"
        />
        <button
          className={styles.search__btn}
          onClick={() => {
            this.props.searchBtnHandler(this.searchInputRef.current.value || undefined);
          }}
        >
          Search
        </button>
        <button
          className={classnames(
            styles.search__voice,
            window.SpeechRecognition in window ? '' : styles['search__voice--hide'],
          )}
        ></button>
      </section>
    );
  }
}

Search.propTypes = {
  searchBtnHandler: PropTypes.func,
};

export default Search;
