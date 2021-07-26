import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import photos from './photos/photosReducer';
import photo from './photo/photoReducer';
import user from './user/userReducer';

const reducers = combineReducers({
  photos,
  photo,
  user,
});

const middleware = [reduxThunk];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
