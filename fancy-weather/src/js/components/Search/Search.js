import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
        <button className={styles.search__voice}></button>
      </section>
    );
  }
}

Search.propTypes = {
  searchBtnHandler: PropTypes.func,
};

export default Search;
