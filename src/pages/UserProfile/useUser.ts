import { fetchUser } from '@/api';
import { useQuery } from 'react-query';

interface UserProps {
  username: string | null;
}

export const useUser = ({ username }: UserProps) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User, Error>(
    ['user', username], 
    async () => {
      if (!username) throw new Error('Username is required');
      return fetchUser(username);
    }, 
    {
      enabled: !!username,
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      onError: (error) => {
        console.error('Error fetching user:', error);
      },
    }
  );

  return {
    user,
    isLoading,
    error,
  };
};
