import { Navbar } from '@/components';
import ProtectedRoute from '@/components/ProtectedRoute';
import { theme } from '@/styles/ColorStyles';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { clearUser, setUser } from '@/store/authSlice';
import { ThemeProvider } from 'styled-components';

const Photos = lazy(() => import('@/pages/Photos'));
const Photo = lazy(() => import('@/pages/Photo'));
const User = lazy(() => import('@/pages/User'));
const Search = lazy(() => import('@/pages/Search'));
const Collection = lazy(() => import('@/pages/Collection'));
const Favorites = lazy(() => import('@/pages/Favorites'));

const App = () => {
  const darkThemeEnabled = useSelector((state) => state.theme.darkThemeEnabled);

  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
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
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  }
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
