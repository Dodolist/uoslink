import React, { useState, useEffect } from "react";
import {
  TopBarRightContainer,
  CardWrapper,
  FoodIcon,
  LibraryIcon,
  SettingIcon,
} from "./style";
import FoodCard from "../../FoodCard/index.js";
import SettingCard from "../../SettingCard";
import LibraryCard from "../../LibraryCard";

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
        <FoodIcon className="icon" onClick={() => handleToggleCard("food")} />
      </CardWrapper>
      <CardWrapper>
        <LibraryCard
          openedCardName={openedCardName}
          handleClose={handleCloseCard}
        />
        <LibraryIcon
          className="icon"
          onClick={() => handleToggleCard("library")}
        />
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
        <SettingIcon
          className="icon"
          onClick={() => handleToggleCard("setting")}
        />
      </CardWrapper>
    </TopBarRightContainer>
  );
};

export default TopBarRight;
