import React, { useState, useEffect } from "react";
import {
  TopBarRightContainer,
  CardWrapper,
  IconWrapper
} from "./style";
import FoodCard from "../../FoodCard/index.js";
import SettingCard from "../../SettingCard";
import LibraryCard from "../../LibraryCard";
import foodIcon from "../../../images/food-icon.svg";
import libraryIcon from "../../../images/library-icon.svg";
import settingIcon from "../../../images/setting-icon.svg";

const TopBarRight = ({
  theme,
  custom,
  isSideBarOpen,
  toggleTheme,
  toggleSideBar,
  toggleCustom,
  isClickCustomBanner,
}) => {
  const [openedCardName, setOpenedCardName] = useState("");

  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const openAndCloseCard = async () => {
      if (isClickCustomBanner) {
        await delay(100);
        if (openedCardName !== "setting") {
          handleToggleCard("setting");
          await delay(500);
        }
        toggleCustom();
        await delay(500);
        handleCloseCard();
      }
    };
    openAndCloseCard();
  }, [isClickCustomBanner]);

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
        <IconWrapper>
          <img
            src={foodIcon}
            calssName="icon"
            onClick={() => handleToggleCard("food")}
          />
        </IconWrapper>
      </CardWrapper>
      <CardWrapper>
        <LibraryCard
          openedCardName={openedCardName}
          handleClose={handleCloseCard}
        />
        <IconWrapper>
          <img
            src={libraryIcon}
            calssName="icon"
            onClick={() => handleToggleCard("library")}
          />
        </IconWrapper>
      </CardWrapper>
      <CardWrapper>
        <SettingCard
          openedCardName={openedCardName}
          theme={theme}
          custom={custom}
          isSideBarOpen={isSideBarOpen}
          handleClose={handleCloseCard}
          toggleTheme={toggleTheme}
          toggleSideBar={toggleSideBar}
          toggleCustom={toggleCustom}
        />
        <IconWrapper>
          <img
            src={settingIcon}
            className="icon"
            onClick={() => handleToggleCard("setting")}
          />
        </IconWrapper>
      </CardWrapper>
    </TopBarRightContainer>
  );
};

export default TopBarRight;
