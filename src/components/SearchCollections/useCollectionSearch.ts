import { useLocation } from 'react-router-dom';
import useSearch from '../SearchPhotos/useSearch';

const useCollectionSearch = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') ?? '';
    
    return useSearch(query, 'collections');
  };
  
  export default useCollectionSearch;