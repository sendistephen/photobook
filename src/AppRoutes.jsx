import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';

const Photos = lazy(() => import('@/pages/Photos')),
  Photo = lazy(() => import('@/pages/Photo')),
  User = lazy(() => import('@/pages/User')),
  Search = lazy(() => import('@/pages/Search')),
  Collection = lazy(() => import('@/pages/Collection')),
  Favorites = lazy(() => import('@/pages/Favorites')),
  AppRoutes = () => (
    <Suspense fallback={<>...</>}>
      <Routes>
        <Route path="/" element={<Photos />} />
        <Route path="/photos/:id" element={<Photo />} />
        <Route path="/users/:username" element={<User />} />
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
