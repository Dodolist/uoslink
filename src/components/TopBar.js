import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import logo from "../images/logo.svg";
import foodIcon from "../images/food-icon.svg";
import libraryIcon from "../images/library-icon.svg";
import settingIcon from "../images/setting-icon.svg";
import FoodCard from "./FoodCard/index.js";
import SettingCard from "./SettingCard";
import LibraryCard from "./LibraryCard";
import ServiceNotice from "./ServiceNotice";

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

const TopBarContainer = styled("div")`
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

const TopBarLeft = styled("div")`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  flex-shrink: 0;
`;

const ImgWrap = styled("div")`
  position: relative;
  display: flex;
`;

const TopBarRight = ({ theme, isSideBarOpen, toggleTheme, toggleSideBar }) => {
  const [openedCardName, setOpenedCardName] = useState("");

  const handleToggleCard = (cardName) => {
    if (cardName === openedCardName) handleCloseCard();
    else setOpenedCardName(cardName);
  };

  const handleCloseCard = () => {
    setOpenedCardName("");
  };
  return (
    <TopBarRightContainer>
      <CardWrapper>
        <FoodCard
          openedCardName={openedCardName}
          handleClose={handleCloseCard}
        />
        <img
          className="icon"
          onClick={() => handleToggleCard("food")}
          src={foodIcon}
        />
      </CardWrapper>
      <CardWrapper>
        <LibraryCard
          openedCardName={openedCardName}
          handleClose={handleCloseCard}
        />
        <img
          className="icon"
          onClick={() => handleToggleCard("library")}
          src={libraryIcon}
        />
      </CardWrapper>
      <CardWrapper>
        <SettingCard
          openedCardName={openedCardName}
          theme={theme}
          isSideBarOpen={isSideBarOpen}
          handleClose={handleCloseCard}
          toggleTheme={toggleTheme}
          toggleSideBar={toggleSideBar}
        />
        <img
          className="icon"
          onClick={() => handleToggleCard("setting")}
          src={settingIcon}
        />
      </CardWrapper>
    </TopBarRightContainer>
  );
};

const TopBarRightContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  flex-shrink: 0;
`;
const ServiceName = styled("span")`
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

  ${(props) =>
    props.theme.mode === "dark" &&
    `
    background: linear-gradient(90deg, #5d616f 20%, #d1d6e6 50%, #5d616f 80%);
    background-size: 400% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
`;

const TopBar = ({ theme, isSideBarOpen, toggleTheme, toggleSideBar }) => {
  return (
    <TopBarContainer>
      <TopBarLeft>
        <ImgWrap>
          <img className="logo" src={logo} alt="logo" />
        </ImgWrap>
        <ServiceName>시대링크</ServiceName>
        <ServiceNotice />
      </TopBarLeft>
      <TopBarRight
        theme={theme}
        isSideBarOpen={isSideBarOpen}
        toggleTheme={toggleTheme}
        toggleSideBar={toggleSideBar}
      />
    </TopBarContainer>
  );
};

export default TopBar;
