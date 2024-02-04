import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import BlackScreen from '../BlackScreen';

import searchIcon from '../../images/32-search-icon.svg';

const SearchPage = ({isSearchPageOpen, closeSearchPage, searchNotice}) => {
  const [searchText, setSearchText] = useState('');
  
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      searchNotice(searchText);
      closeSearchPage();
      setTimeout(() => {
        setSearchText('');
      }, 200);

    }
  };

  return (
    <>
      <BlackScreen isOpen={isSearchPageOpen} method={closeSearchPage} />
      <SearchPageContainer isSearchPageOpen={isSearchPageOpen}>
        <Icon src={searchIcon} inputText={searchText} />
        <SearchInput
          type="text"
          value={searchText}
          placeholder="공지사항 제목을 입력하세요"
          onChange={handleSearchTextChange}
          onKeyDown={handleEnter}
        />
      </SearchPageContainer>
    </>
  );
}

export default SearchPage;


const SearchPageContainer = styled.div`
  z-index: 1000;
  position: fixed;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  display: flex;
  flex-direction: row;

  background-color: ${props => props.theme.foreground};
  padding: 16px;
  border-radius: 24px;

  min-width: 800px;

  ${props => props.isSearchPageOpen && css`
    top: 64px;
    opacity: 1;
  `}
`

const Icon = styled.img`
  width: 32px;
  height: 32px;
  filter: grayscale(1);
  ${props => props.inputText && css`
    animation: ${animation} 0.3s;
    filter: grayscale(0);
  `}
`

const SearchInput = styled.input`
  width: 100%;

  border: none;
  outline: none;
  background-color: transparent;

  color: ${props => props.theme.contentText};
  font-size: 16px;

  &::placeholder {
    color: ${props => props.theme.subText};
  }
`

const animation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`
