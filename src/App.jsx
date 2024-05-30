import { Navbar } from '@/components';
import { theme } from '@/styles/ColorStyles';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { ThemeProvider } from 'styled-components';
import AppRoutes from './AppRoutes';
import { useAuthState } from './useAuthState';

const App = () => {
  useAuthState();

  const darkThemeEnabled = useSelector((state) => state.theme.darkThemeEnabled);

  return (
    <>
      <ToastProvider autoDismiss autoDismissTimeout={4000} placement="top-left">
        <ThemeProvider theme={darkThemeEnabled ? theme.light : theme.dark}>
          <GlobalStyles />
          <Router>
            <Navbar />
            <AppRoutes />
          </Router>
        </ThemeProvider>
      </ToastProvider>
    </>
  );
};

export default App;
