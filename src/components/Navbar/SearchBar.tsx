import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormGroup, Input, SearchIcon } from './Navbar.styles';

export const SearchBar = () => {
  const [query, setQuery] = useState(''),
    navigate = useNavigate(),
    handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          placeholder="Search photos and illustrations..."
        />
      </FormGroup>
    </form>
  );
};