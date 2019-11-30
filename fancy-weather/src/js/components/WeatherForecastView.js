import AbstractView from './AbstractView';

export default class WeatherForecastView extends AbstractView {
  constructor(weatherData) {
    super();
    this.weatherData = weatherData;
  }
}
