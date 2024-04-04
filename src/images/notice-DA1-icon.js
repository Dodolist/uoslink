import styled from "styled-components";
import { ReactComponent as NoticeDA1IconSVG } from "./notice-DA1-icon.svg";

const NoticeDA1Icon = styled(NoticeDA1IconSVG)`
  width: 100%;
  height: 100%;
  * {
    fill: ${(props) => props.theme.primary};
  }
`;

export default NoticeDA1Icon;
