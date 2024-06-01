import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from '@/styles/ColorStyles';
import { GlobalStyles } from '@/styles/GlobalStyles';

import AppRoutes from './AppRoutes';
import { Navbar } from './components';
import { useAuthState } from './useAuthState';

const App = () => {
  useAuthState();

  const darkThemeEnabled = useSelector((state) => state.theme.darkThemeEnabled);

  return (
    <>
      <Toaster position="bottom-right" />
      <ThemeProvider theme={darkThemeEnabled ? theme.light : theme.dark}>
        <GlobalStyles />
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
