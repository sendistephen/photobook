import axios from 'axios';
import styled from 'styled-components';

const base = import.meta.env.VITE_APP_UNSPLASH_API_URL,
  key = import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY,
  server = import.meta.env.VITE_APP_PHOTO_SERVER_API;

export const getPhotoUrl = (photoId) => {
  const id = photoId ? `${photoId}` : null;
  return `${base}/photos/${id}?client_id=${key}`;
};

export const getUserPhotosUrl = ({ username, page, perPage }) =>
  `${base}/users/${username}/photos?page=${page}&per_page=${perPage}&client_id=${key}`;

export const getAllCollections = ({ page, perPage }) =>
  `${base}//collections?page=${page}&per_page=${perPage}&client_id=${key}`;
export const getSingleTopic = ({ slug }) =>
  `${base}/topics/${slug}?client_id=${key}`;

export const getCollection = ({ collectionId, page, perPage }) => {
  if (!collectionId) {
    return;
  }
  return `${base}/collections/${collectionId}/photos?page=${page}&per_page=${perPage}&client_id=${key}`;
};

export const getSingleCollection = ({ collectionId }) => {
  if (!collectionId) {
    return;
  }
  return `${base}/collections/${collectionId}?client_id=${key}`;
};
export const getFavorites = () => `${server}photos/favorites`;
export const savePhoto = () => `${server}photos/favorites`;

export const filterProps = (Component, shouldForwardProp) =>
  styled(Component).withConfig({ shouldForwardProp })();

// fetch data from the api

export const fetchData = async (apiCall, params, rejectWithValue) => {
  try {
    const response = await axios(apiCall(params));
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
};
