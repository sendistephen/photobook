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

/**
 * Fetches user-related data like photos, collections, likes based on the provided type.
 * @param username - The username of the user.
 * @param dataType - The type of data to fetch (photos, collections, likes).
 * @param page - Pagination support, defaulting to page 1.
 * @returns The specific data type related to the user.
 */

export async function fetchUserData<T>(
  username: string,
  dataType: 'photos' | 'collections' | 'likes',
  page: number = 1,
): Promise<T> {
  return fetchData<T>(`users/${username}/${dataType}`, { page });
}

export const fetchPhotos = async (page: number, perPage: number = 20) => {
  return fetchData<Photo[]>('photos', { page, per_page: perPage });
};

export const fetchCollectionPhotos = async (
  collectionId: string,
  page: number,
  perPage: number = 20,
) => {
  return fetchData<Photo[]>(`collections/${collectionId}/photos`, {
    page,
    per_page: perPage,
  });
};

export const fetchPhoto = async (photoId: string) => {
  return fetchData<Photo>(`photos/${photoId}`);
};

  export const search = async(
    type: 'photos' | 'collections' | 'users',
    query: string,
    page: number,
  perPage: number = 20,
) => fetchData<ApiResponse>(`search/${type}`, { query, page, per_page: perPage });

export const fetchUser = async (username: string) =>
  fetchData<User>(`users/${username}`);
