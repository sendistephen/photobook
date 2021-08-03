import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import photos from './photos/photosReducer';
import photo from './photo/photoReducer';
import user from './user/userReducer';
import photoCollection from './collections/collectionsReducer';
import collection from './collection/collectionReducer';
import search from './search/searchReducer';
import favorites from './favorites/favoritesReducer';
import theme from './theme/themeReducer';

const reducers = combineReducers({
  photos,
  photo,
  user,
  photoCollection,
  collection,
  search,
  favorites,
  theme,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'theme'],
};

const middleware = [reduxThunk];

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
