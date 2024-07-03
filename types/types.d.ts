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
  user: User;
}

interface Tag {
  title: string;
}

interface User {
  id: string;
  name: string;
  username: string;
  profile_image: {
    small: string;
  };
  bio: string;
  portfolio_url: string;
  followers_count: number;
  following_count: number;
  downloads: number;
  instagram_username: string;
}
