import React, { Component } from 'react';
import './App.scss';
import Controls from './components/Controls/Controls';
import Search from './components/Search/Search';
import Dashboard from './components/Dashboard/Dashboard';
import Map from './components/Map/Map';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="app__title visually-hidden">Fancy Weather</h1>
        <Controls></Controls>
        <Search></Search>
        <Dashboard></Dashboard>
        <Map></Map>
      </React.Fragment>
    );
  }
}

export default App;
