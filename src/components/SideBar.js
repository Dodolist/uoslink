import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import addIcon from '../images/add-icon.svg';
import BlackScreen from './BlackScreen';
import InputModal from './InputModal';

const SideBarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.foreground};
  border-radius: 8px 0 0 8px;
  padding: 8px;
  gap: 40px;
`

const ShortCutList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
`

const ShortCutWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  background-color: ${(props) => props.theme.mode === 'light' ? '#ffffff' : '#5d616f'};
  border-radius: 8px;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
`

const ShortCutIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  user-select: none;
`

const AddButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.theme.background };
  border-radius: 8px;

  cursor: pointer;

  &:hover {
    filter: ${(props) => props.theme.mode === 'light' ? 'brightness(0.9)' : 'brightness(1.8)'};
  }
  &:active {
    filter: ${(props) => props.theme.mode === 'light' ? 'brightness(0.8)' : 'brightness(2)'};
  }
`
const AddButton = styled.img`
  width: 14px;
  height: 14px;
  user-select: none;
  filter: ${(props) => props.theme.mode === 'light' ? '' : 'brightness(0.5)'};
`

const SideBar = () => {
  return (
    <SideBarContainer>
      <BlackScreen />
      <InputModal />
      <ShortCutList>
        <ShortCutWrap>
          <ShortCutIcon src="https://www.naver.com/favicon.ico" />
        </ShortCutWrap>
        <ShortCutWrap>
          <ShortCutIcon src="https://www.daum.net/favicon.ico" />
        </ShortCutWrap>
        <ShortCutWrap>
          <ShortCutIcon src="https://www.github.com/favicon.ico" />
        </ShortCutWrap>
        <ShortCutWrap>
          <ShortCutIcon src="https://www.apple.com/favicon.ico" />
        </ShortCutWrap>
      </ShortCutList>
      <AddButtonWrap>
      <AddButton src={addIcon} />
      </AddButtonWrap>
    </SideBarContainer>
  );
};

export default SideBar;
