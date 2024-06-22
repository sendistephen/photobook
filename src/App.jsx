import AppRoutes from './AppRoutes';
import { Navbar } from './components';
import Providers from './providers';
import { useAuthState } from './useAuthState';

const App = () => {
  useAuthState();

  return (
    <Providers>
      <Navbar />
      <AppRoutes />
    </Providers>
  );
};

export default App;
