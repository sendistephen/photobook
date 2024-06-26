import { QueryClient, QueryClientProvider } from 'react-query';

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
