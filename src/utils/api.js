export const getURL = (config) => {
  const base = process.env.REACT_APP_UNSPLASH_API_URL;
  const key = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

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
  const base = process.env.REACT_APP_UNSPLASH_API_URL;
  const key = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
  const id = photoId ? `${photoId}` : null;

  return `${base}photos/${id}?client_id=${key}`;
};
