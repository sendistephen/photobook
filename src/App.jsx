import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { observeAuthState } from 'store/authSlice';
import { ToastProvider } from 'react-toast-notifications';
import { Navbar } from 'components';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/ColorStyles';
import { GlobalStyles } from 'styles/GlobalStyles';
import ProtectedRoute from 'components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Photos = lazy(() => import('pages/Photos'));
const Photo = lazy(() => import('pages/Photo'));
const User = lazy(() => import('pages/User'));
const Search = lazy(() => import('pages/Search'));
const Collection = lazy(() => import('pages/Collection'));
const Favorites = lazy(() => import('pages/Favorites'));

const App = () => {
  const darkThemeEnabled = useSelector((state) => state.theme.darkThemeEnabled);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(observeAuthState());
  }, [dispatch]);

  return (
    <>
      <ToastProvider autoDismiss autoDismissTimeout={4000} placement='top-left'>
        <ThemeProvider theme={darkThemeEnabled ? theme.light : theme.dark}>
          <GlobalStyles />
          <Router>
            <Navbar />
            <Suspense fallback={<>...</>}>
              <Routes>
                <Route path='/' element={<Photos />} />
                <Route path='/photos/:id' element={<Photo />} />
                <Route path='/users/:username' element={<User />} />
                <Route path='/search/photos/:searchWord' element={<Search />} />
                <Route
                  path='/search/collections/:searchWord'
                  element={<Search />}
                />
                <Route
                  path='/collections/:collectionId/photos'
                  element={<Collection />}
                />
                <Route
                  path='/favorites'
                  element={<ProtectedRoute element={<Favorites />} />}
                />
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </ToastProvider>
    </>
  );
};

export default App;
