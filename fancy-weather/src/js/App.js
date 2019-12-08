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

class App extends Component {
  onSearchHandler = async town => {
    const geocodingData = await getCoordinatesJSON(town);
    const coordinatesObj = geocodingData.results[0].geometry;
    const newLocation = {
      city: geocodingData.results[0].components.city,
      country: geocodingData.results[0].components.country_code.toUpperCase(),
    };
    this.props.onLocationUpdate(newLocation);
    const coordinates = `${coordinatesObj.lat}, ${coordinatesObj.lng}`;
    const newWeather = await getWeatherJSON(coordinates);
    this.props.onWeatherUpdate(newWeather);
  };

  onReloadHandler = async (weather, location) => {
    const data = await getPhotosJSON(weather, location);
    const chosenPhoto = data.photos.photo[Math.round(Math.random() * data.photos.length)];
    setBackground(chosenPhoto.url_h);
  };

  async componentDidMount() {
    const userLocation = await getUserLocation();
    this.props.onLocationUpdate(userLocation);
    const currentLocationWeather = await getWeatherJSON(userLocation.loc);
    this.props.onWeatherUpdate(currentLocationWeather);
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="app__title visually-hidden">Fancy Weather</h1>
        <Controls reloadBtnHandler={this.onReloadHandler}></Controls>
        <Search searchBtnHandler={this.onSearchHandler}></Search>
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
    todayForecast: state.todayForecast,
    location: state.location,
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
