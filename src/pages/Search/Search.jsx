import PhotoTopic from '../../components/PhotoTopic';
import { SearchTabs } from './SearchTabs';
import { useToggleTabs } from './useToggleTabs';

const Search = () => {
  const { toggleTabs } = useToggleTabs();

  return (
    <>
      <PhotoTopic />
      <SearchTabs />
      {toggleTabs()}
    </>
  );
};

export default Search;
