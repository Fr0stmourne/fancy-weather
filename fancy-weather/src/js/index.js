import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/main.scss';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import updateReducer from './reducers';
import App from './App';
import LocalStorageProvider from './localStorageProvider';

const store = createStore(updateReducer);
store.subscribe(() => {
  LocalStorageProvider.setSettings(store.getState().appSettings);
  console.log(store.getState());
});

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
