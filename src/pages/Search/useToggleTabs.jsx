import { useLocation } from 'react-router-dom';

import { SearchCollections, SearchPhotos } from '../../components/index';

export const useToggleTabs = () => {
  const location = useLocation();

  const toggleTabs = () => {
    if (location.pathname.includes('photos')) {
      return <SearchPhotos />;
    }
    return <SearchCollections />;
  };

  return { toggleTabs };
};
