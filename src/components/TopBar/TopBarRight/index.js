import React, { useState } from "react";
import { TopBarRightContainer, CardWrapper } from "./style";
import foodIcon from "../../../images/food-icon.svg";
import libraryIcon from "../../../images/library-icon.svg";
import settingIcon from "../../../images/setting-icon.svg";
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
}) => {
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
          custom={custom}
          isSideBarOpen={isSideBarOpen}
          handleClose={handleCloseCard}
          toggleTheme={toggleTheme}
          toggleSideBar={toggleSideBar}
          toggleCustom={toggleCustom}
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

export default TopBarRight;
