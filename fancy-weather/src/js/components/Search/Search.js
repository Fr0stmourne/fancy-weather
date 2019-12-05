import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchInputRef = React.createRef();
  }

  render() {
    return (
      <section className="app__search search">
        <input ref={this.searchInputRef} className="search__input" type="search" name="location" id="search" />
        <button
          className="search__btn"
          onClick={() => {
            this.props.searchBtnHandler(this.searchInputRef.current.value || undefined);
          }}
        >
          Search
        </button>
      </section>
    );
  }
}

Search.propTypes = {
  searchBtnHandler: PropTypes.func,
};

export default Search;
