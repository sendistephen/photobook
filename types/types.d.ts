interface Photo {
  id: string;
  urls: {
    raw: string;
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
    large: string;
    medium: string;
  };
  bio: string;
  portfolio_url: string;
  followers_count: number;
  following_count: number;
  downloads: number;
  instagram_username: string;
  social: {
    instagram_username: string;
    portfolio_url: string;
    twitter_username: string;
  };
  tags: {
    custom: {
      title: string;
    }[];
  };
}

interface Collection {
  id: string;
  description: string;
  title: string;
  total_photos: number;
  user: User;
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
  };
  tags: {
    title: string;
  }[];
  cover_photo: {
    alt_description: string;
    urls: {
      small: string;
      regular: string;
      full: string;
      raw: string;
      thumb: string;
    };
  };
}
urls: {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}
links: {
  self: string;
  html: string;
  download: string;
}

interface ApiResponse {
  total: number;
  total_pages: number;
  results: Photo[] | Collection[];
}

interface SearchParams {
  query: string;
  page?: number;
  perPage?: number;
  orderBy?: 'latest' | 'relevant';
  collections?: string;
  contentFilter?: 'low' | 'high';
  color?:
    | 'black_and_white'
    | 'black'
    | 'white'
    | 'yellow'
    | 'orange'
    | 'red'
    | 'purple'
    | 'magenta'
    | 'green'
    | 'teal'
    | 'blue';
  orientation?: 'landscape' | 'portrait' | 'squarish';
}

type UserDataType = 'photos' | 'likes' | 'collections';

// return types for each user data type

interface UserDataTypeReturn {
  photos: Photo[];
  likes: Photo[];
  collections: Collection[];
}
