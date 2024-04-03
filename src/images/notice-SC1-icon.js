import styled from "styled-components";
import { ReactComponent as NoticeSC1IconSVG } from "./notice-SC1-icon.svg";

const NoticeSC1Icon = styled(NoticeSC1IconSVG)`
  width: 100%;
  height: 100%;
  circle {
    fill: ${(props) => props.theme.secondary};
  }
  path {
    fill: ${(props) => props.theme.primary};
  }
`;

export default NoticeSC1Icon;
