interface GalleryProps {
  photos: Photo[];
  fetchNextPage: () => void;
  hasMore: boolean;
  isLoading: boolean;
  isInitialLoading: boolean;
  handleOpenPhoto: (photo: Photo, photos: Photo[]) => void;
}

interface Photo {
  id: string;
  urls: {
    raw: string;
    small: string;
    full: string;
    thumb: string;
    regular: string;
    small_s3: string;
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

interface Tag {
  title: string;
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

interface ApiResponse {
  total: number;
  total_pages: number;
  results: Photo[] | Collection[];
}
interface UserDataTypeReturn {
  photos: Photo[];
  likes: Photo[];
  collections: Collection[];
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

interface PhotoModalContentProps {
  isLoading: boolean;
  photo: Photo | null;
  isFavorited: boolean;
  onFavorite: () => void;
  onClose: () => void;
}

interface CollectionInfoSectionProps {
  title: string;
  totalPhotos: number;
  userName: string;
  tags: Tag[];
}

interface InfiniteCollectionScrollProps {
    collections: Collection[];
    fetchNextPage: () => void;
    hasNextPage: boolean;
  }