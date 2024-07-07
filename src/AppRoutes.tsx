import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const Explore = lazy(() => import('./pages/Explore')),
  UserProfile = lazy(() => import('./pages/UserProfile/UserProfile')),
  Search = lazy(() => import('./pages/Search')),
  Collection = lazy(() => import('./pages/Collection')),
  Favorites = lazy(() => import('./pages/Favorites')),
  PhotoModal = lazy(() => import('./components/PhotoModal')),
  UserPhotos = lazy(() => import('./components/User/UserPhotos')),
  UserCollections = lazy(() => import('./components/User/UserCollections')),
  UserLikes = lazy(() => import('./components/User/UserLikes')),
  SearchPhotos = lazy(() => import('./components/SearchPhotos/SearchPhotos')),
  SearchCollections = lazy(
    () => import('./components/SearchCollections/SearchCollections'),
  ),
  AppRoutes = () => (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/users/:username" element={<UserProfile />}>
          <Route index element={<Navigate replace to="photos" />} />
          <Route path="photos" element={<UserPhotos />} />
          <Route path="collections" element={<UserCollections />} />
          <Route path="likes" element={<UserLikes />} />
        </Route>
        {/* TODO: Add photos/:photoId route */}
        <Route path="/photos/:photoId" element={<PhotoModal />} />
        <Route path="/search" element={<Search />}>
          <Route index element={<Navigate to="photos" />} />
          <Route path="photos" element={<SearchPhotos />} />
          <Route path="collections" element={<SearchCollections />} />
        </Route>

        <Route
          path="/collections/:collectionId/:collectionTitle"
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
