import styled from "styled-components";
import { ReactComponent as NoticeFA35IconSVG } from "./notice-FA35-icon.svg";

const NoticeFA35Icon = styled(NoticeFA35IconSVG)`
  width: 100%;
  height: 100%;
  path {
    fill: ${(props) => props.theme.primary};
  }
  path:nth-child(2) {
    fill: ${(props) => props.theme.secondary};
  }
`;

export default NoticeFA35Icon;
