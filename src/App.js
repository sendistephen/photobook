/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { setUserToken } from 'store/Auth/authReducer';
import { ToastProvider } from 'react-toast-notifications';
import Loader from 'react-loader-spinner';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Photos, Photo, User, Search, Collection } from 'pages';
import { Navbar } from 'components';
import Favorites from 'pages/Favorites';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/ColorStyles';
import { GlobalStyles } from 'styles/GlobalStyles';
import { getThemePreference } from 'store/theme/themeReducer';
import ProtectedRoute from 'components/ProtectedRoute';

const App = () => {
  const { darkThemeEnabled } = useSelector(getThemePreference);
  const auth = useSelector((state) => state.auth);
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const token = await getAccessTokenSilently();
      dispatch(setUserToken(user, token));
    } catch (error) {
      console.log(error);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (isLoading) {
      <Loader type='ThreeDots' color='#32D3AC' />;
    }
  }, []);

  return (
    <>
      <ToastProvider autoDismiss autoDismissTimeout={4000} placement='top-left'>
        <ThemeProvider theme={darkThemeEnabled ? theme.light : theme.dark}>
          <GlobalStyles />
          <Router>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Photos} />
              <Route path='/photos/:id' component={Photo} />
              <Route path='/users/:username' component={User} />
              <Route
                exact
                path='/search/photos/:searchWord'
                component={Search}
              />
              <Route
                exact
                path='/search/collections/:searchWord'
                component={Search}
              />
              <Route
                exact
                path='/collections/:collectionId/photos'
                component={Collection}
              />
              <ProtectedRoute
                isAuthenticated={auth.isAuthenticated}
                exact
                path='/favorites'
                Component={Favorites}
              />
            </Switch>
          </Router>
        </ThemeProvider>
      </ToastProvider>
    </>
  );
};

export default App;
