import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormGroup, Input, SearchIcon } from './Navbar.styles';

export const SearchBar = () => {
  const [query, setQuery] = useState(''),
    navigate = useNavigate(),
    handleSearch = (e) => {
      setQuery(e.target.value);
    },
    handleSubmit = (e) => {
      e.preventDefault();
      navigate(`/search/photos/${query}`);
      setQuery('');
    };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <SearchIcon />
        <Input
          value={query}
          onChange={handleSearch}
          type="text"
          placeholder="Search..."
        />
      </FormGroup>
    </form>
  );
};
