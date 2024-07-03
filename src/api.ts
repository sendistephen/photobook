import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_UNSPLASH_API_URL;
const ACCESS_KEY = import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY;

export const fetchPhotos = async (page: number, perPage: number = 20) => {
  const response = await axios.get(`${BASE_URL}/photos`, {
    params: {
      client_id: ACCESS_KEY,
      page,
      per_page: perPage,
    },
  });
  return response.data;
};

export const fetchPhoto = async (photoId: string) => {
  const response = await axios.get(`${BASE_URL}/photos/${photoId}`, {
    params: {
      client_id: ACCESS_KEY,
    },
  });

  return response.data;
};
