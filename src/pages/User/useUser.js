import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { clearUserPhotos, fetchUser } from '@/store/userSlice';

export const useUser = () => {
  const { username } = useParams(),
    dispatch = useDispatch(),
    { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (username) {
      dispatch(fetchUser(username));
    }
    return () => {
      dispatch(clearUserPhotos());
    };
  }, [username, dispatch]);

  return {
    user,
    isLoading,
  };
};
