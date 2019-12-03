import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <section className="app__search search">
        <input className="search__input" type="search" name="location" id="search" />
        <button className="search__btn">Search</button>
      </section>
    );
  }
}

export default Search;
