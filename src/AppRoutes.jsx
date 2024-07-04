import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const Explore = lazy(() => import('./pages/Explore')),
  Photo = lazy(() => import('./pages/Photo')),
  UserProfile = lazy(() => import('./pages/UserProfile/UserProfile')),
  Search = lazy(() => import('./pages/Search')),
  Collection = lazy(() => import('./pages/Collection')),
  Favorites = lazy(() => import('./pages/Favorites')),
  PhotoModal = lazy(() => import('./components/PhotoModal')),
  UserPhotos = lazy(() => import('./components/User/UserPhotos')),
  UserCollections = lazy(() => import('./components/User/UserCollections')),
  UserLikes = lazy(() => import('./components/User/UserLikes')),
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
