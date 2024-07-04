import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_UNSPLASH_API_URL;
const ACCESS_KEY = import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY;

/**
 * Generic function to perform GET requests from the API
 * @param endpoint
 * @param params
 * @returns response data
 */

const fetchData = async (
  endpoint: string,
  params: Record<string, any> = {},
) => {
  const response = await axios.get(`${BASE_URL}/${endpoint}`, {
    params: {
      client_id: ACCESS_KEY,
      ...params,
    },
  });
  return response.data;
};

export const fetchPhotos = async (page: number, perPage: number = 20) => {
  return fetchData('photos', { page, per_page: perPage });
};

export const fetchPhoto = async (photoId: string) => {
  return fetchData(`photos/${photoId}`);
};

export const fetchUser = async (username: string) => {
  return fetchData(`users/${username}`);
};

export const fetchUserPhotos = async (username: string, page: number) => {
  return fetchData(`users/${username}/photos`, { page });
};

export const fetchUserCollections = async (username: string, page: number) => {
  return fetchData(`users/${username}/collections`, { page });
};
