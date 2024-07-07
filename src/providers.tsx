import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RootState, store } from './store';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

interface ProviderProps {
  children: React.ReactNode;
}
const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      cacheTime: 1000 * 60 * 15, // 15 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({ children }: ProviderProps) => {
  const darkThemeEnabled = useSelector(
    (state: RootState) => state.theme.darkThemeEnabled,
  );

  return (
    <ReduxProvider store={store}>
      <Router>
        <Toaster position="bottom-right" />
        <ThemeProvider theme={darkThemeEnabled ? theme.light : theme.dark}>
          <GlobalStyles />
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </ThemeProvider>
      </Router>
    </ReduxProvider>
  );
};

export default Providers;
