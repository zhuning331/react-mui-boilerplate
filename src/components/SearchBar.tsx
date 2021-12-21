import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';

import { Search, SearchIconWrapper, StyledInputBase } from '../styles/SearchBar';
import ISearchBarProps from '../types/SearchBarProps';

const SearchBar: React.FC<ISearchBarProps> = (props: ISearchBarProps) => {
  const {onSearchTermChange} = props;
  const { t } = useTranslation();

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={t('global.action.search') + '...'}
        inputProps={{ 'aria-label': 'search' }}
        onChange={onSearchTermChange}
      />
    </Search>
  )
}

export default SearchBar;