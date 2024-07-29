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
(max-width:599px) 100vw,
(min-width:600px) and (max-width:1199px) 50vw,,
(min-width:1200px) 33vw
`;

export const getImageSrc = (urls: Photo['urls']) => {
  return (
    urls.small_s3 ||
    urls.small ||
    urls.raw ||
    urls.thumb ||
    urls.regular ||
    urls.full
  );
};
