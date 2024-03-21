import React from "react";
import { TopBarContainer, TopBarLeft, ImgWrap, ServiceName } from "./style";
import logo from "../../images/logo.svg";
import ServiceNotice from "../ServiceNotice";
import TopBarRight from "./TopBarRight";

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
