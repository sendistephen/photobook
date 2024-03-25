import styled from 'styled-components';

const base = import.meta.env.VITE_APP_UNSPLASH_API_URL;
const key = import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY;
const server = import.meta.env.VITE_APP_PHOTO_SERVER_API;

export const getURL = (config) => {
  const query = Object.entries(config).reduce(
    (accumulator, current, index, array) => {
      if (index === array.length - 1) {
        return accumulator + `${current[0]}=${current[1]}`;
      }
      return accumulator + `${current[0]}=${current[1]}&`;
    },
    ''
  );
  return `${base}photos?${query}&client_id=${key}`;
};

export const getPhotoUrl = (photoId) => {
  const id = photoId ? `${photoId}` : null;
  return `${base}photos/${id}?client_id=${key}`;
};

export const getUserUrl = (username) => {
  if (!username) return null;
  return `${base}users/${username}?client_id=${key}`;
};

export const getUserPhotosUrl = ({ username, page, perPage }) => {
  return `${base}users/${username}/photos?page=${page}&per_page=${perPage}&client_id=${key}`;
};

export const getUserCollections = ({ username, page, perPage }) => {
  if (!username) return null;
  return `${base}users/${username}/collections?page=${page}&per_page=${perPage}&client_id=${key}`;
};

export const getSearchResults = ({ query, page, perPage }) => {
  return `${base}search/photos?page=${page}&query=${query}&per_page=${perPage}&client_id=${key}`;
};

export const getCollections = ({ query, page, perPage }) => {
  return `${base}search/collections?page=${page}&query=${query}&per_page=${perPage}&client_id=${key}`;
};
export const getAllCollections = ({ page, perPage }) => {
  return `${base}/collections?page=${page}&per_page=${perPage}&client_id=${key}`;
};
export const getSingleTopic = ({ slug }) => {
  return `${base}topics/${slug}?client_id=${key}`;
};

export const getCollection = ({ collectionId, page, perPage }) => {
  if (!collectionId) return;
  return `${base}collections/${collectionId}/photos?page=${page}&per_page=${perPage}&client_id=${key}`;
};

export const getSingleCollection = ({ collectionId }) => {
  if (!collectionId) return;
  return `${base}collections/${collectionId}?client_id=${key}`;
};
export const getFavorites = () => {
  return `${server}photos/favorites`;
};
export const savePhoto = () => {
  return `${server}photos/favorites`;
};

export const filterProps = (Component, shouldForwardProp) =>
  styled(Component).withConfig({ shouldForwardProp })();
