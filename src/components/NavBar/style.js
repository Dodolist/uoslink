import styled, { css } from "styled-components";

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

const SectionIcon = styled.img`
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

const ButtonIcon = styled.img`
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

export {
  NavBarContainer,
  Section,
  SectionIcon,
  SectionName,
  NavBarDivider,
  SearchButton,
  ButtonIcon,
  ButtonName,
};
