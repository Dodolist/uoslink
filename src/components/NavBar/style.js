import styled, { css } from "styled-components";
import {ReactComponent as BookmarkIconSVG} from "../../images/bookmark-icon.svg";
import {ReactComponent as NoticeFA1IconSVG} from "../../images/notice-FA1-icon.svg";
import {ReactComponent as NoticeFA2IconSVG} from "../../images/notice-FA2-icon.svg";
import {ReactComponent as NoticeFA35IconSVG} from "../../images/notice-FA35-icon.svg";
import {ReactComponent as NoticeDA1IconSVG} from "../../images/notice-DA1-icon.svg";
import {ReactComponent as NoticeSC1IconSVG} from "../../images/notice-SC1-icon.svg";
import {ReactComponent as NoticeFA34IconSVG} from "../../images/notice-FA34-icon.svg";
import {ReactComponent as SearchIconSVG} from "../../images/search-icon.svg";

const NavBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  border-radius: 8px;
  gap: 16px;
  background-color: ${(props) => props.theme.foreground};
  min-width: 140px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const SectionName = styled.span`
  //position: relative;
  transition: all 0.3s;
  color: ${(props) => props.theme.contentText};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
  opacity: 0.5;

  ${(props) =>
    props.selected &&
    css`
      opacity: 1;
      font-weight: 700;
    `}

  &:hover {
    opacity: 1;
  }
  /*
  &::after {
    position: absolute;
    top: 0;
    right: -8px;
    content: '';
    width: 6px;
    height: 6px;
    background-color: ${(props) => props.theme.primary};
    border-radius: 50%;
  }
  */
`;

const NavBarDivider = styled.div`
  height: 1px;
  background-color: ${(props) =>
    props.theme.mode === "light" ? "#00000020" : "#ffffff20"};
  margin: -4px 0;
  border-radius: 1px;
`;

const SearchButton = styled.div`
  position: absolute;
  top: calc(100% + 16px);
  left: 0;
  right: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 16px 12px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.foreground};
  min-width: 140px;

  cursor: pointer;

  &:hover {
    filter: ${(props) =>
      props.showOption ? "brightness(1)" : "brightness(0.9)"};
  }
  &:active {
    filter: ${(props) =>
      props.showOption ? "brightness(1)" : "brightness(0.8)"};
  }
`;

const ButtonIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const ButtonName = styled.span`
  transition: all 0.3s;
  color: ${(props) => props.theme.primary};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
  user-select: none;
`;

const BookmarkIcon = styled(BookmarkIconSVG)`
  * {
    fill: ${(props) => props.theme.primary};
  }
`

const NoticeFA1Icon = styled(NoticeFA1IconSVG)`
  path:nth-child(1), path:nth-child(2) {
    fill: ${(props) => props.theme.primary};
  }
  path:last-child {
    fill: ${(props) => props.theme.secondary};
  }
`

const NoticeFA2Icon = styled(NoticeFA2IconSVG)`
  path:first-child {
    fill: ${(props) => props.theme.primary};
  }
  path:last-child {
    fill: ${(props) => props.theme.secondary};
  }
`

const NoticeFA35Icon = styled(NoticeFA35IconSVG)`
  path {
    fill: ${(props) => props.theme.primary};
  }
  path:nth-child(2) {
    fill: ${(props) => props.theme.secondary};
  }
`

const NoticeDA1Icon = styled(NoticeDA1IconSVG)`
  * {
    fill: ${(props) => props.theme.primary};
  }
`

const NoticeSC1Icon = styled(NoticeSC1IconSVG)`
  circle {
    fill: ${(props) => props.theme.secondary};
  }
  path {
    fill: ${(props) => props.theme.primary};
  }
`

const NoticeFA34Icon = styled(NoticeFA34IconSVG)`
  circle {
    fill: ${(props) => props.theme.primary};
  }
  circle:first-child {
    fill: ${(props) => props.theme.secondary};
  }
  path {
    fill: ${(props) => props.theme.secondary};
  }
  path:last-child {
    fill: ${(props) => props.theme.primary};
  }
`

const SearchIcon = styled(SearchIconSVG)`
  * {
    fill: ${(props) => props.theme.primary};
  }
`

export {
  NavBarContainer,
  Section,
  SectionIcon,
  SectionName,
  NavBarDivider,
  SearchButton,
  ButtonIcon,
  ButtonName,
  BookmarkIcon,
  NoticeFA1Icon,
  NoticeFA2Icon,
  NoticeFA35Icon,
  NoticeDA1Icon,
  NoticeSC1Icon,
  NoticeFA34Icon,
  SearchIcon
};
