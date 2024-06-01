import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { theme } from '@/styles/ColorStyles';

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
