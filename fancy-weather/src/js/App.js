import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Controls from './components/Controls/Controls';
import Search from './components/Search/Search';
import Dashboard from './components/Dashboard/Dashboard';
import WeatherMap from './components/Map/Map';
import { getWeatherJSON, getCoordinatesJSON, getUserLocation, getCoordsObjFromString } from './utils';
import { updateForecast, updateLocation, updateTempScale, updateLang, updateBackgroundPhoto } from './actions';

class App extends Component {
  onTempScaleChangeHandler = async tempScale => {
    this.props.onTempScaleChange(tempScale);
  };

  onSearchHandler = async town => {
    const geocodingData = await getCoordinatesJSON(town);
    const coordinatesObj = geocodingData.results[0].geometry;
    const cityField = geocodingData.results[0].components;
    const newLocation = {
      city: cityField.city || cityField.county || cityField.state || cityField.village,
      country: geocodingData.results
        .find(result => Object.keys(result.components).includes('country_code'))
        .components.country_code.toUpperCase(),
      coordinates: geocodingData.results[0].geometry,
    };
    this.props.onLocationUpdate(newLocation);
    const coordinates = `${coordinatesObj.lat}, ${coordinatesObj.lng}`;
    const newWeather = await getWeatherJSON(coordinates, this.props.appSettings.tempScale);
    this.props.onWeatherUpdate(newWeather);
  };

  onLangChangeHandler = lang => {
    this.props.onLangChange(lang);
  };

  onBgReload = this.props.onBgReload.bind(
    null,
    this.props.todayForecast.icon,
    new Date(this.props.todayForecast.time * 1000).getMonth(),
    this.props.location.coordinates,
  );

  async componentDidMount() {
    const userLocation = await getUserLocation();
    userLocation.coordinates = getCoordsObjFromString(userLocation.loc);
    this.props.onLocationUpdate(userLocation);
    const currentLocationWeather = await getWeatherJSON(userLocation.loc, this.props.appSettings.tempScale);
    this.props.onWeatherUpdate(currentLocationWeather);
    this.onBgReload();
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="app__title visually-hidden">Fancy Weather</h1>
        <Controls
          appSettings={this.props.appSettings}
          location={this.props.location}
          tempScaleChangeHandler={this.onTempScaleChangeHandler}
          reloadBtnHandler={this.onBgReload}
          langChangeHandler={this.onLangChangeHandler}
        ></Controls>
        <Search searchBtnHandler={this.onSearchHandler}></Search>
        <Dashboard
          appSettings={this.props.appSettings}
          location={this.props.location}
          todayForecast={this.props.todayForecast}
          futureForecasts={this.props.forecasts}
        ></Dashboard>
        <WeatherMap location={this.props.location}></WeatherMap>
      </React.Fragment>
    );
  }
}

function MapStateToProps(state) {
  return {
    forecasts: state.forecasts,
    todayForecast: state.todayForecast,
    location: state.location,
    appSettings: state.appSettings,
  };
}

function MapDispatchToProps(dispatch) {
  return {
    onWeatherUpdate: forecastsObj => dispatch(updateForecast(forecastsObj)),
    onLocationUpdate: location => dispatch(updateLocation(location)),
    onTempScaleChange: tempScale => dispatch(updateTempScale(tempScale)),
    onLangChange: lang => dispatch(updateLang(lang)),
    onBgReload(weather, month, location) {
      dispatch(updateBackgroundPhoto(weather, month, location));
    },
  };
}

App.propTypes = {
  forecasts: PropTypes.array,
  onWeatherUpdate: PropTypes.func,
  onLocationUpdate: PropTypes.func,
  onTimeTick: PropTypes.func,
  onTempScaleChange: PropTypes.func,
  onLangChange: PropTypes.func,
  onBgReload: PropTypes.func,
  todayForecast: PropTypes.object,
  location: PropTypes.object,
  appSettings: PropTypes.object,
};

export default connect(MapStateToProps, MapDispatchToProps)(App);
