import styled from "styled-components";
import { ReactComponent as NoticeFA1IconSVG } from "./notice-FA1-icon.svg";

const NoticeFA1Icon = styled(NoticeFA1IconSVG)`
  width: 100%;
  height: 100%;
  path:nth-child(1),
  path:nth-child(2) {
    fill: ${(props) => props.theme.primary};
  }
  path:last-child {
    fill: ${(props) => props.theme.secondary};
  }
`;

export default NoticeFA1Icon;
