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
  getLocationInfo,
} from './actions';
import { langMapping } from './utils';
import ErrorPopup from './components/ErrorPopup/ErrorPopup';

class App extends Component {
  searchCity = async town => {
    await this.props.getLocationInfo(town);
    await this.props.updateWeather();
    await this.props.updateBackgroundPhoto();
  };

  changeLanguage = lang => {
    this.props.onLangChange(lang);
    this.searchCity();
  };

  async componentDidMount() {
    await this.props.getInitialLocation();
    this.searchCity();
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
              reloadBtnHandler={this.props.updateBackgroundPhoto}
              langChangeHandler={this.changeLanguage}
            ></Controls>
            <Search searchBtnHandler={this.searchCity} appSettings={this.props.appSettings}></Search>
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
  return state;
}

function MapDispatchToProps(dispatch) {
  return {
    updateWeather: () => dispatch(updateWeather()),
    getLocationInfo: town => dispatch(getLocationInfo(town)),
    getInitialLocation: () => dispatch(getInitialLocation()),
    onTempScaleChange: tempScale => dispatch(updateTempScale(tempScale)),
    onLangChange: lang => dispatch(updateLang(lang)),
    updateBackgroundPhoto: () => dispatch(updateBackgroundPhoto()),
  };
}

App.propTypes = {
  forecasts: PropTypes.array,
  updateWeather: PropTypes.func,
  getLocationInfo: PropTypes.func,
  onTimeTick: PropTypes.func,
  getInitialLocation: PropTypes.func,
  onTempScaleChange: PropTypes.func,
  onLangChange: PropTypes.func,
  updateBackgroundPhoto: PropTypes.func,
  todayForecast: PropTypes.object,
  location: PropTypes.object,
  appSettings: PropTypes.object,
  isLoading: PropTypes.bool,
  bgHasError: PropTypes.bool,
  cityHasError: PropTypes.bool,
};

export default connect(MapStateToProps, MapDispatchToProps)(App);
