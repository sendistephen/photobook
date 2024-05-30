import ProtectedRoute from '@/components/ProtectedRoute';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Photos = lazy(() => import('@/pages/Photos'));
const Photo = lazy(() => import('@/pages/Photo'));
const User = lazy(() => import('@/pages/User'));
const Search = lazy(() => import('@/pages/Search'));
const Collection = lazy(() => import('@/pages/Collection'));
const Favorites = lazy(() => import('@/pages/Favorites'));

const AppRoutes = () => {
  return (
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
};

export default AppRoutes;
