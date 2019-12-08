import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Controls from './components/Controls/Controls';
import Search from './components/Search/Search';
import Dashboard from './components/Dashboard/Dashboard';
import Map from './components/Map/Map';
import { getPhotosJSON, setBackground, getWeatherJSON, getCoordinatesJSON, getUserLocation } from './utils';
import { updateForecast, updateLocation } from './actions';

const onReloadHandler = async (weather, location) => {
  const data = await getPhotosJSON(weather, location);
  const chosenPhoto = data.photos.photo[Math.round(Math.random() * 10)];
  setBackground(chosenPhoto.url_h);
};

const onSearchHandler = async town => {
  const coordinatesJSON = (await getCoordinatesJSON(town)).results[0].geometry;
  const coordinates = `${coordinatesJSON.lat}, ${coordinatesJSON.lng}`;
  const data = await getWeatherJSON(coordinates);
  console.log(data);
};

class App extends Component {
  async componentDidMount() {
    // this.props.onWeatherUpdate(['cloudy', 'sunny', 'rainy']);
    const userLocation = await getUserLocation();
    // console.log(this.props.location);
    this.props.onLocationUpdate(userLocation);
    // console.log(this.props.location);
    const currentLocationWeather = await getWeatherJSON(userLocation.loc);
    console.log(currentLocationWeather);
    this.props.onWeatherUpdate(currentLocationWeather);
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="app__title visually-hidden">Fancy Weather</h1>
        <Controls reloadBtnHandler={onReloadHandler}></Controls>
        <Search searchBtnHandler={onSearchHandler}></Search>
        <Dashboard
          location={this.props.location}
          todayForecast={this.props.todayForecast}
          futureForecasts={this.props.forecasts}
        ></Dashboard>
        <Map></Map>
      </React.Fragment>
    );
  }
}

function MapStateToProps(state) {
  return {
    forecasts: state.forecasts,
  };
}

function MapDispatchToProps(dispatch) {
  return {
    onWeatherUpdate: forecastsObj => dispatch(updateForecast(forecastsObj)),
    onLocationUpdate: location => dispatch(updateLocation(location)),
  };
}

App.propTypes = {
  forecasts: PropTypes.array,
  onWeatherUpdate: PropTypes.func,
  onLocationUpdate: PropTypes.func,
  todayForecast: PropTypes.object,
  location: PropTypes.object,
};

export default connect(MapStateToProps, MapDispatchToProps)(App);
