const PREFIXES = [
  { value: 1, symbol: '' },
  { value: 1000, symbol: 'k' },
  { value: 1000000, symbol: 'M' },
  { value: 1000000000, symbol: 'B' },
  { value: 1000000000000, symbol: 'T' },
];

export const shortenNumber = (number: number) => {
  if (number === 0) {
    return number;
  }

  const divisor = PREFIXES.filter((num) => number >= num.value).pop(),
    truncatedNumber = (number / divisor!.value).toFixed(1);

  return `${truncatedNumber}${divisor!.symbol}`;
};
export const breakpointColumnObj = {
  default: 3,
  1100: 2,
  700: 1,
};

export const generateSrcSet = (photo: Photo) => {
  if (!photo || !photo.urls) return '';

  const { thumb, small, regular, full } = photo.urls;
  return `${thumb} 200w, ${small} 400w, ${regular} 800w, ${full} 1600w`;
};

export const imageSize = `
(max-width: 599px) 100vw,
(min-width: 600px) and (max-width: 1199px) 50vw,
(min-width: 1200px) 33vw
`;

export const getImageSrc = (urls: Photo['urls']) => {
  return (
    urls.small ||
    urls.regular ||
    urls.thumb ||
    urls.small_s3 ||
    urls.full ||
    urls.raw
  );
};

export const getOptimizedImageSrc = (urls: Photo['urls'], width: number) => {
  if (width <= 400) {
    return urls.thumb || urls.small;
  } else if (width <= 800) {
    return urls.small || urls.regular;
  } else {
    return urls.regular || urls.full;
  }
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const imageExtractor = (item: Photo | Collection) => {
  const urls = 'cover_photo' in item ? item.cover_photo.urls : item.urls;

  return urls.regular || urls.full || urls.small || urls.thumb || null;
};

export const getStat = (photo: Photo | null) => [
  { label: 'Views', value: photo?.views },
  { label: 'Downloads', value: photo?.downloads },
];

export function setScreenWidth(width: number) {
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
}
