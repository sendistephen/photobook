import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchPhoto } from '@/store/photoSlice';

export const usePhoto = () => {
  const { id } = useParams(),
    dispatch = useDispatch(),
    photo = useSelector((state) => state.photo.photo),
    favorited = useSelector((state) =>
      Boolean(state.favorites.photos[photo.id]),
    );

  useEffect(() => {
    dispatch(fetchPhoto(id));
  }, [id, dispatch]);

  return {
    photo,
    favorited,
  };
};
