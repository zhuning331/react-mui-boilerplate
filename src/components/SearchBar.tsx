import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '../styles/SearchBar';
import ISearchBarProps from '../types/SearchBarProps';

const SearchBar: React.FC<ISearchBarProps> = (props: ISearchBarProps) => {
  const {onSearchTermChange} = props;
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={onSearchTermChange}
      />
    </Search>
  )
}

export default SearchBar;