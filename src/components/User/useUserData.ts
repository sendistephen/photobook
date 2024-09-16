import { useInfiniteQuery } from 'react-query';
import { fetchUserData } from '@/api';

interface UserDataProps{
    username: string;
    endpoint:'collections' | 'likes' | 'photos';
}

export const useUserData = <T>({username,endpoint}:UserDataProps) => {
    return useInfiniteQuery<T[],Error>(
        [endpoint,username],
        ({pageParam=1}) => fetchUserData(username,endpoint,pageParam),
        {
            getNextPageParam: (lastPage,pages) => {
                if(!lastPage || lastPage.length === 0) return undefined;
                return pages.length + 1;
            }
        }
    )
}