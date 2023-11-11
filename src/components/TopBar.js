import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.svg';
import foodIcon from '../images/food-icon.svg';
import libraryIcon from '../images/library-icon.svg';
import settingIcon from '../images/setting-icon.svg';
import FoodCard from './FoodCard/index.js';
import SettingCard from './SettingCard';
import LibraryCard from './LibraryCard';
import ServiceNotice from './ServiceNotice';

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
  background-color: ${(props) => props.theme.foreground};
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
`

const CardWrapper = styled.div`
  position: relative;
  display: flex;
`

const TopBar = ({ theme, isSideBarOpen, toggleTheme, toggleSideBar, openConfirmModal }) => {
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
        <img className="logo" src={logo} alt="logo" />
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
            handleClose = {handleCloseCard('setting')}
            toggleTheme={toggleTheme}
            toggleSideBar={toggleSideBar}
            openConfirmModal={openConfirmModal}
          />
          <img className="icon" onClick={handleOpenCard('setting')} src={settingIcon} />
        </CardWrapper>
      </TopBarRight>
    </TopBarContainer>
  )
};

export default TopBar;
