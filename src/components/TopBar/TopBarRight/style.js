import styled from "styled-components";
import { ReactComponent as FoodCardSVG } from "../../../images/food-icon.svg";
import { ReactComponent as LibraryCardSVG } from "../../../images/library-icon.svg";
import { ReactComponent as SettingCardSVG } from "../../../images/setting-icon.svg";

const TopBarRightContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  flex-shrink: 0;
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
`;

const FoodIcon = styled(FoodCardSVG)`
  rect {
    fill: ${(props) => props.theme.primary};
  }
`;

const LibraryIcon = styled(LibraryCardSVG)`
  rect {
    fill: ${(props) => props.theme.primary};
  }
`;

const SettingIcon = styled(SettingCardSVG)`
`;

export { TopBarRightContainer, CardWrapper, FoodIcon, LibraryIcon, SettingIcon };
