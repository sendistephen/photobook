import { useNavigate } from 'react-router-dom';
import { FormGroup, Input, SearchIcon } from './Navbar.styles';
import { useState } from 'react';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
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
