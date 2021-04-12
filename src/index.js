import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '_redux/store';
import Navigator from './navigation/index';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default App;
