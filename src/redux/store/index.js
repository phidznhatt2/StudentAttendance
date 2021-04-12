import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import get from 'lodash/get';
import reducers from '_redux/reducers';

const configureStore = () => {
  const composeEnhancers =
    get(window, ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) || compose;
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

  return store;
};

export default configureStore;
