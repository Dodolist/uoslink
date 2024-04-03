import styled, { keyframes } from 'styled-components';
import { ReactComponent as LoadingIconSVG } from "./loading-icon.svg";

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  } 
`;

const LoadingIcon = styled(LoadingIconSVG)`
  path {
    stroke: ${(props) => props.theme.primary};
  }
  animation: ${rotateAnimation} 4s cubic-bezier(.25,.51,.43,.7) infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 48px;
  height: 48px;
`

export default LoadingIcon;
