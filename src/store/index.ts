import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authSlice';
import favoritesReducer from './favoritesSlice';
import modalReducer from './modalSlice';
import photoReducer from './photoSlice';
import themeReducer from './themeSlice';

const rootReducer = combineReducers({
    photo: photoReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
    auth: authReducer,
    modal: modalReducer,
  }),
  persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme'],
  },
  persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PERSIST',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);

// Define a type for the Redux store
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
