import styled from "styled-components";
import { ReactComponent as NoticeFA34IconSVG } from "./notice-FA34-icon.svg";

const NoticeFA34Icon = styled(NoticeFA34IconSVG)`
  width: 100%;
  height: 100%;
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
`;

export default NoticeFA34Icon;
