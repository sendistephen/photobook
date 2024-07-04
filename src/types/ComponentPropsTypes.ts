interface GalleryProps {
  photos: Photo[];
  fetchNextPage: () => void;
  hasMore: boolean;
  isLoading: boolean;
  isInitialLoading: boolean;
  handleOpenPhoto: (photo: Photo, photos: Photo[]) => void;
}
