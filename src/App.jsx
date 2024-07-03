import { Navbar, PhotoModal } from '@/components';
import AppRoutes from './AppRoutes';
import Providers from './providers';
import { useAuthState } from './useAuthState';

const App = () => {
  useAuthState();

  return (
    <Providers>
      <Navbar />
      <PhotoModal />
      <AppRoutes />
    </Providers>
  );
};

export default App;
