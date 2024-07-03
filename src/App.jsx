import { Navbar, PhotoModal } from '@/components';
import AppRoutes from './AppRoutes';
import Providers from './providers';
import { Container } from './styles';
import { useAuthState } from './useAuthState';

const App = () => {
  useAuthState();

  return (
    <Providers>
      <Container>
        <Navbar />
        <PhotoModal />
        <AppRoutes />
      </Container>
    </Providers>
  );
};

export default App;
