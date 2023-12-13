import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../images/logo.svg';
import santaHat from '../images/santa-hat.svg';
import foodIcon from '../images/food-icon.svg';
import libraryIcon from '../images/library-icon.svg';
import settingIcon from '../images/setting-icon.svg';
import FoodCard from './FoodCard/index.js';
import SettingCard from './SettingCard';
import LibraryCard from './LibraryCard';
import ServiceNotice from './ServiceNotice';

// 글자 배경색 바뀌는 애니메이션 제작
const blink = keyframes`
  0% {
    background-position: 0 0;
  } 
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

const TopBarContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1280px;
  padding: 16px;
  margin: 0 auto;
  border-radius: 0 0 8px 8px;
  background-color: ${(props) => props.theme.foreground}f4;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.05);
`;

const TopBarLeft = styled('div')`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  flex-shrink: 0;
`

const ImgWrap = styled('div')`
  position: relative;
  display: flex;
`

const SantaHat = styled('img')`
  position: absolute;
  top: -8px;
  left: -2px;
  width: 16px;
  height: 16px;
  transform: rotate(-32deg);
`

const TopBarRight = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  flex-shrink: 0;
`
const ServiceName = styled('span')`
  color: ${(props) => props.theme.subText};
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -1px;
  user-select: none;

  animation: ${blink} 10s infinite;
  background: linear-gradient(90deg, #a9adb9 20%, #d1d6e6 50%, #a9adb9 80%);
  background-size: 400% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${(props) => props.theme.mode === 'dark' && `
    background: linear-gradient(90deg, #5d616f 20%, #d1d6e6 50%, #5d616f 80%);
    background-size: 400% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`

const CardWrapper = styled.div`
  position: relative;
  display: flex;
`

const TopBar = ({ theme, isSideBarOpen, activeSnow, toggleTheme, toggleSideBar, toggleSnow }) => {
  const [isOpenedFoodCard, setIsOpenedFoodCard] = useState(false);
  const [isOpenedLibraryCard, setIsOpenedLibraryCard] = useState(false);
  const [isOpenedSettingCard, setIsOpenedSettingCard] = useState(false);

  const handleOpenCard = (card) => () => {
    if(card === 'food') {
      setIsOpenedFoodCard(!isOpenedFoodCard);
      setIsOpenedLibraryCard(false);
      setIsOpenedSettingCard(false);
    } else if(card === 'library') {
      setIsOpenedLibraryCard(!isOpenedLibraryCard);
      setIsOpenedFoodCard(false);
      setIsOpenedSettingCard(false);
    } else if(card === 'setting') {
      setIsOpenedSettingCard(!isOpenedSettingCard);
      setIsOpenedFoodCard(false);
      setIsOpenedLibraryCard(false);
    }
  };

  const handleCloseCard = (card) => () => {
    if(card === 'food') {
      setIsOpenedFoodCard(false);
    } else if(card === 'library') {
      setIsOpenedLibraryCard(false);
    } else if(card === 'setting') {
      setIsOpenedSettingCard(false);
    } 
  };

  return (
    <TopBarContainer>
      <TopBarLeft>
        <ImgWrap>
          <img className="logo" src={logo} alt="logo" />
          <SantaHat src={santaHat} alt="santaHat" />
        </ImgWrap>
        <ServiceName>시대링크</ServiceName>
        <ServiceNotice />
      </TopBarLeft>
      <TopBarRight>
        <CardWrapper>
          <FoodCard
            isShow={isOpenedFoodCard}
            handleClose = {handleCloseCard('food')}
          />
          <img className="icon" onClick={handleOpenCard('food')} src={foodIcon} />
        </CardWrapper>
        <CardWrapper>
          <LibraryCard
            isShow={isOpenedLibraryCard}
            handleClose = {handleCloseCard('library')}
          />
          <img className="icon" onClick={handleOpenCard('library')} src={libraryIcon} />
        </CardWrapper>
        <CardWrapper>
          <SettingCard
            isShow={isOpenedSettingCard}
            theme={theme}
            isSideBarOpen={isSideBarOpen}
            activeSnow={activeSnow}
            handleClose = {handleCloseCard('setting')}
            toggleTheme={toggleTheme}
            toggleSideBar={toggleSideBar}
            toggleSnow={toggleSnow}
          />
          <img className="icon" onClick={handleOpenCard('setting')} src={settingIcon} />
        </CardWrapper>
      </TopBarRight>
    </TopBarContainer>
  )
};

export default TopBar;
