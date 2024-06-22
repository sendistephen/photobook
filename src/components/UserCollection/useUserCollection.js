import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchUserCollections } from '../../store/userSlice';

export const useUserCollection = () => {
  const { username } = useParams(),
    dispatch = useDispatch();
  useEffect(() => {
    if (username) {
      dispatch(fetchUserCollections({ username }));
    }
  }, [username, dispatch]);

  const collections = useSelector((state) => state.user.collections);

  return {
    collections,
  };
};
