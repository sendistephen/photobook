import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_UNSPLASH_API_URL;
const ACCESS_KEY = import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY;

/**
 * Generic function to perform GET requests from the API
 * @param endpoint
 * @param params
 * @returns response data
 */

const fetchData = async <T>(
  endpoint: string,
  params: Record<string, any> = {},
): Promise<T> => {
  const response = await axios.get<T>(`${BASE_URL}/${endpoint}`, {
    params: {
      client_id: ACCESS_KEY,
      ...params,
    },
  });
  return response.data;
};

export const fetchUserData = async <T extends UserDataType>(
  username: string,
  dataType: T,
  page: number = 1,
): Promise<UserDataTypeReturn[T]> => {
  return fetchData<UserDataTypeReturn[T]>(`users/${username}/${dataType}`, {
    page,
  });
};

export const fetchPhotos = async (page: number, perPage: number = 20) => {
  return fetchData('photos', { page, per_page: perPage });
};

export const fetchPhoto = async (photoId: string) => {
  return fetchData(`photos/${photoId}`);
};

export const searchPhotos = async (
  query: string,
  page: number,
  perPage: number = 20,
) =>
  fetchData<ApiResponse>('search/photos', { query, page, per_page: perPage });

export const searchCollections = async (
  query: string,
  page: number,
  perPage: number = 20,
) =>
  fetchData<ApiResponse>('search/collections', {
    query,
    page,
    per_page: perPage,
  });

export const fetchUser = async (username: string) =>
  fetchData<User>(`users/${username}`);
