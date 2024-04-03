import styled from "styled-components";
import { ReactComponent as BookmarkIconSVG } from "./bookmark-icon.svg";

const BookmarkIcon = styled(BookmarkIconSVG)`
  width: 100%;
  height: 100%;
  * {
    fill: ${(props) => props.theme.primary};
  }
`;

export default BookmarkIcon;
