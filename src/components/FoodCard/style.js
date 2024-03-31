import styled, { css } from "styled-components";
import { ReactComponent as BreakfastIconSVG } from "../../images/breakfast-icon.svg";
import { ReactComponent as LunchIconSVG } from "../../images/lunch-icon.svg";
import { ReactComponent as DinnerIconSVG } from "../../images/dinner-icon.svg";

const FoodCardContainer = styled("div")`
  transition: all 0.3s;
  position: absolute;
  top: 40px;
  right: 0px;
  min-width: 300px;
  width: max-content;

  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.theme.mode === "light" ? "#ffffff" : "#1d2128"};

  z-index: 100;

  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.boxShadow};

  transform: ${(props) =>
    props.isshow ? "translateY(0)" : "translateY(-24px)"};
  transform-origin: top right;
  opacity: ${(props) => (props.isshow ? "1" : "0")};
  user-select: ${(props) => (props.isshow ? "auto" : "none")};
  pointer-events: ${(props) => (props.isshow ? "auto" : "none")};
  scale: ${(props) => (props.isshow ? "1" : "0.9")};
`;

const FoodCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 0 0 16px 16px;
  gap: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 16px;
  min-height: 140px;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  transform: translateY(${(props) => (props.isShow ? 0 : 8)}px);
  ${(props) =>
    props.isShow &&
    css`
      transition-delay: ${(props) => props.delay}s;
      transition-duration: 0.5s;
    `}
`;

const MenuCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: ${(props) =>
    props.theme.mode === "light" ? "#f6f7fb" : "#292c33"};
  border-radius: 8px;
  gap: 24px;
`;

const NoMenuCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 12px;
  background-color: ${(props) =>
    props.theme.mode === "light" ? "#f6f7fb" : "#292c33"};
  border-radius: 8px;
`;

const NoMenuIcon = styled.img`
  width: 128px;
  height: 128px;
`;

const NoMenuText = styled.span`
  color: ${(props) => props.theme.subText};
  font-size: ${(props) => (props.size === "small" ? "14px" : "16px")};
  font-weight: bold;
  letter-spacing: -0.5px;
`;

const CornerWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const CornerText = styled.span`
  color: ${(props) => props.theme.primary};
  font-size: 12px;
  font-weight: bold;
  margin: 2px 8px 0 0;
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;

const MenuRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MenuIconName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
`;

const TimeIcon = styled.div`
  transition: all 0.3s;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${(props) => (props.selected ? "1" : "0.25")};
  background-color: ${(props) =>
    props.theme.mode === "light" ? "#ffffff" : "#1d2128"};
  border-radius: 8px;

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
`;

const BreakfastIcon = styled(BreakfastIconSVG)`
  * {
    fill: ${(props) => props.theme.primary};
  }
`;

const LunchIcon = styled(LunchIconSVG)`
  * {
    fill: ${(props) => props.theme.primary};
  }
`;

const DinnerIcon = styled(DinnerIconSVG)`
  * {
    fill: ${(props) => props.theme.primary};
  }
`;

export {
  FoodCardContainer,
  FoodCardHeader,
  Wrapper,
  MenuContainer,
  InfoWrapper,
  MenuCard,
  NoMenuCard,
  NoMenuIcon,
  NoMenuText,
  CornerWrapper,
  CornerText,
  MenuWrapper,
  MenuRow,
  MenuIconName,
  TimeIcon,
  BreakfastIcon,
  LunchIcon,
  DinnerIcon,
};
