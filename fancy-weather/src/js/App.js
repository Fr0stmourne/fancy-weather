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
import ErrorPopup from './components/ErrorPopup/ErrorPopup';

class App extends Component {
  onSearch = async town => {
    await this.props.onLocationUpdate(town, this.props.appSettings.language);
    const { coordinates } = this.props.location;
    const coordinatesStr = `${coordinates.lat}, ${coordinates.lng}`;
    await this.props.onWeatherUpdate(this.props.appSettings.language, coordinatesStr);
  };

  onBgReload = () => {
    this.props.onBgReload(
      this.props.todayForecast.icon,
      this.props.todayForecast.time,
      this.props.location.coordinates,
    );
  };

  onLangChange = async lang => {
    await this.props.onLangChange(lang); //
    await this.onSearch(this.props.location.city);
  };

  async componentDidMount() {
    await this.props.onInitialLocationUpdate();
    await this.onSearch(this.props.location.city);
    // this.onBgReload(); doesn't work without timeout cuz store isn't updated immediately after action dispatching (why?)
    setTimeout(() => this.onBgReload(), 300);
  }

  render() {
    const lang = langMapping[this.props.appSettings.language];

    return (
      <React.Fragment>
        {this.props.isLoading && (
          <div className={styles['preloader-container']}>
            <ClimbingBoxLoader size={50} color={'#4C5255'} loading={this.props.isLoading} />
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
            <ErrorPopup
              isHidden={!this.props.bgHasError}
              popupFor={'bg'}
              appSettings={this.props.appSettings}
            ></ErrorPopup>
            <ErrorPopup
              isHidden={!this.props.cityHasError}
              popupFor={'city'}
              appSettings={this.props.appSettings}
            ></ErrorPopup>
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
    bgHasError: state.bgHasError,
    cityHasError: state.cityHasError,
  };
}

function MapDispatchToProps(dispatch) {
  return {
    onWeatherUpdate(lang, location) {
      dispatch(updateWeather(location, lang));
    },
    onLocationUpdate: town => dispatch(getLocation(town)),
    onInitialLocationUpdate: () => dispatch(getInitialLocation()),
    onTempScaleChange: tempScale => dispatch(updateTempScale(tempScale)),
    onLangChange: lang => dispatch(updateLang(lang)),
    onBgReload(weather, time, location) {
      dispatch(updateBackgroundPhoto(weather, time, location));
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
  bgHasError: PropTypes.bool,
  cityHasError: PropTypes.bool,
};

export default connect(MapStateToProps, MapDispatchToProps)(App);
