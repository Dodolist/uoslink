import styled, { css, keyframes } from "styled-components";
const ToastContainer = styled.div`
  position: fixed;
  opacity: 0;
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  flex-direction: column;
  min-width: 320px;
  border-radius: 8px;
  background-color: #408cff;
  justify-content: center;
  overflow: hidden;
  ${(props) =>
    props.$toastState &&
    props.type === "copy" &&
    css`
      opacity: 1;
      transform: translateY(-90%);
    `}
  ${(props) =>
    props.$toastState &&
    props.type === "bookmarkup" &&
    props.$toastOption &&
    css`
      opacity: 1;
      transform: translateY(-90%);
    `}
    ${(props) =>
    props.$toastState &&
    props.type === "bookmarkdown" &&
    !props.$toastOption &&
    css`
      opacity: 1;
      transform: translateY(-90%);
    `};
`;
const ToastIcon = styled.img`
  width: 24px;
  height: 24px;
`;
const ToastText = styled.div`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
`;
const ToastWrapper = styled.div`
  padding: 16px 0 16px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const progressbar = keyframes`
  from{
    width: 0%;
  }
  to{
    width: 100%;
  }
`;

const Progress = styled.div`
  background: rgba(256, 256, 256, 0.5);
  width: 100%;
  height: 4px;
  position: absolute;
  bottom: 0;
  animation: ${(props) =>
    props.$runAnimation
      ? css`
          ${progressbar} 1.8s linear forwards
        `
      : "none"};
`;

export {
  ToastContainer,
  ToastIcon,
  ToastText,
  ToastWrapper,
  progressbar,
  Progress,
};
