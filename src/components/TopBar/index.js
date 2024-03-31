import React from "react";
import { TopBarContainer, TopBarLeft, ImgWrap, ServiceName, Logo } from "./style";
import ServiceNotice from "../ServiceNotice";
import TopBarRight from "./TopBarRight";

const TopBar = ({
  theme,
  custom,
  isSideBarOpen,
  toggleTheme,
  toggleSideBar,
  toggleCustom,
}) => {
  return (
    <TopBarContainer>
      <TopBarLeft>
        <ImgWrap>
          <Logo />
        </ImgWrap>
        <ServiceName>시대링크</ServiceName>
        <ServiceNotice />
      </TopBarLeft>
      <TopBarRight
        theme={theme}
        custom={custom}
        isSideBarOpen={isSideBarOpen}
        toggleTheme={toggleTheme}
        toggleSideBar={toggleSideBar}
        toggleCustom={toggleCustom}
      />
    </TopBarContainer>
  );
};

export default TopBar;
