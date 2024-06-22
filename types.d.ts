interface Photo {
  id: string;
  urls: {
    small: string;
    full: string;
    thumb: string;
  };
  alt_description: string;
}
