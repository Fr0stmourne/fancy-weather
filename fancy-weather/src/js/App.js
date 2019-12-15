import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { YMaps } from 'react-yandex-maps';
import { ClimbingBoxLoader } from 'react-spinners';
import styles from './App.module.scss';
import Controls from './components/Controls/Controls';
import Search from './components/Search/Search';
import Dashboard from './components/Dashboard/Dashboard';
import WeatherMap from './components/Map/Map';
import {
  updateTempScale,
  updateLang,
  updateBackgroundPhoto,
  getInitialLocation,
  updateWeather,
  getLocation,
} from './actions';
import { langMapping } from './utils';

class App extends Component {
  onSearch = async town => {
    await this.props.onLocationUpdate(town, this.props.appSettings.language);
    const { coordinates } = this.props.location;
    const coordinatesStr = `${coordinates.lat}, ${coordinates.lng}`;
    await this.props.onWeatherUpdate(this.props.appSettings.language, coordinatesStr);
  };

  onBgReload = this.props.onBgReload.bind(
    null,
    this.props.todayForecast.icon,
    new Date(this.props.todayForecast.time * 1000).getMonth(),
    this.props.location.coordinates,
  );

  onLangChange = async lang => {
    await this.props.onLangChange(lang, this.props.location);
    await this.onSearch(this.props.location.city);
  };

  async componentDidMount() {
    await this.props.onInitialLocationUpdate();
    await this.onSearch(this.props.location.city);
    this.onBgReload();
  }

  render() {
    const lang = langMapping[this.props.appSettings.language];

    return (
      <React.Fragment>
        {this.props.isLoading && (
          <div className={styles.preloader}>
            <ClimbingBoxLoader size={70} color={'#4C5255'} loading={this.props.isLoading} />
          </div>
        )}

        <YMaps key={lang} query={{ lang }}>
          <section className={styles['main-container']}>
            <h1 className="visually-hidden">Fancy Weather</h1>
            <Controls
              appSettings={this.props.appSettings}
              tempScaleChangeHandler={this.props.onTempScaleChange}
              reloadBtnHandler={this.onBgReload}
              langChangeHandler={this.onLangChange}
            ></Controls>
            <Search searchBtnHandler={this.onSearch} appSettings={this.props.appSettings}></Search>
            <Dashboard
              appSettings={this.props.appSettings}
              location={this.props.location}
              todayForecast={this.props.todayForecast}
              futureForecasts={this.props.forecasts}
            ></Dashboard>
            <WeatherMap location={this.props.location} appSettings={this.props.appSettings}></WeatherMap>
          </section>
        </YMaps>
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
    isLoading: state.isLoading,
  };
}

function MapDispatchToProps(dispatch) {
  return {
    onWeatherUpdate(lang, location) {
      dispatch(updateWeather(location, lang));
    },
    onLocationUpdate: (city, lang) => dispatch(getLocation(city, lang)),
    onInitialLocationUpdate: () => dispatch(getInitialLocation()),
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
  onInitialLocationUpdate: PropTypes.func,
  onTempScaleChange: PropTypes.func,
  onLangChange: PropTypes.func,
  onBgReload: PropTypes.func,
  todayForecast: PropTypes.object,
  location: PropTypes.object,
  appSettings: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default connect(MapStateToProps, MapDispatchToProps)(App);
