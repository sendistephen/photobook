import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import photos from './photos/photosReducer';
import photo from './photo/photoReducer';
import user from './user/userReducer';
import userPhotos from './userPhotos/userPhotosReducer';
import photoCollection from './collections/collectionsReducer';
import collection from './collection/collectionReducer';

const reducers = combineReducers({
  photos,
  photo,
  user,
  userPhotos,
  photoCollection,
  collection,
});
const middleware = [reduxThunk];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
