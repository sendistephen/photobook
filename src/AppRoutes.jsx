import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const Explore = lazy(() => import('./pages/Explore')),
  Photo = lazy(() => import('./pages/Photo')),
  User = lazy(() => import('./pages/User')),
  Search = lazy(() => import('./pages/Search')),
  Collection = lazy(() => import('./pages/Collection')),
  Favorites = lazy(() => import('./pages/Favorites')),
  PhotoModal = lazy(() => import('./components/PhotoModal')),
  AppRoutes = () => (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/users/:username" element={<User />} />
        <Route path="/photo/:id" element={<Photo />} />
        <Route path="/photos/:photoId" element={<PhotoModal />} />
        <Route path="/search/photos/:searchWord" element={<Search />} />
        <Route path="/search/collections/:searchWord" element={<Search />} />
        <Route
          path="/collections/:collectionId/photos"
          element={<Collection />}
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );

export default AppRoutes;
