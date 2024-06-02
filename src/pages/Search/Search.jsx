import { PhotoTopic } from '@/components';

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
