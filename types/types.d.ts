interface Photo {
  id: string;
  urls: {
    small: string;
    full: string;
    thumb: string;
    regular: string;
  };
  slug: string;
  alt_description: string;
  views: number;
  downloads: number;
  description: string;
  published_at: string;
  exif: {
    name: string;
  };
  tags: Tag[];
  user: {
    name: string;
    username: string;
    profile_image: {
      small: string;
    };
  };
}

interface Tag {
  title: string;
}
