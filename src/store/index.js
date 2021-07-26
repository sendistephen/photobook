import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import photos from './photos/photosReducer';

const reducers = combineReducers({
  photos,
});

const middleware = [reduxThunk];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
