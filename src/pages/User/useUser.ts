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
  } = useQuery<User | Error>(
    ['user', username],
    () => fetchUser(username as string),
    { enabled: !!username },
  );

  return {
    user,
    isLoading,
    error,
  };
};
