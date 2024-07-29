import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RootState, store } from '@/store';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { theme } from '@/styles/theme';

interface ProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const darkThemeEnabled = useSelector(
    (state: RootState) => state.theme.darkThemeEnabled,
  );

  return (
    <ThemeProvider theme={darkThemeEnabled ? theme.light : theme.dark}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export const AllProviders = ({ children }: ProviderProps) => {
  return (
    <ReduxProvider store={store}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <ThemeWrapper>{children}</ThemeWrapper>
        </QueryClientProvider>
      </Router>
    </ReduxProvider>
  );
};
