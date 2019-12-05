import React, { Component } from 'react';
import './App.scss';
import Controls from './components/Controls/Controls';
import Search from './components/Search/Search';
import Dashboard from './components/Dashboard/Dashboard';
import Map from './components/Map/Map';
import { getPhotosJSON, setBackground, getWeatherJSON, getCoordinatesJSON } from './utils';

const onReloadHandler = async (weather, location) => {
  const data = await getPhotosJSON(weather, location);
  const chosenPhoto = data.photos.photo[Math.round(Math.random() * 10)];
  setBackground(chosenPhoto.url_h);
};

const onSearchHandler = async town => {
  const coordinatesJSON = (await getCoordinatesJSON(town)).results[0].geometry;
  const coordinates = `${coordinatesJSON.lat}, ${coordinatesJSON.lng}`;
  console.log(coordinates);
  const data = await getWeatherJSON(coordinates);
  console.log(data);
};

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="app__title visually-hidden">Fancy Weather</h1>
        <Controls reloadBtnHandler={onReloadHandler}></Controls>
        <Search searchBtnHandler={onSearchHandler}></Search>
        <Dashboard></Dashboard>
        <Map></Map>
      </React.Fragment>
    );
  }
}

export default App;
