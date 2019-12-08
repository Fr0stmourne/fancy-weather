import { UPDATE_FORECAST, UPDATE_LOCATION } from './actions';

const initialState = {
  forecasts: [{ random: 1 }, { random: 1 }, { random: 1 }],
  location: 'unknown',
};

function updateReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FORECAST:
      return { ...state, forecasts: action.forecastsList };
    case UPDATE_LOCATION:
      return { ...state, location: action.location };
    default:
      return state;
  }
}

export default updateReducer;
