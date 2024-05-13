import styled, { css } from "styled-components";
import { ReactComponent as AttachedFileIconSVG } from "../../images/attached-file-icon.svg";

const AttachedFileIcon = styled(AttachedFileIconSVG)`
  rect, path {
    fill: ${(props) => props.theme.primary};
    stroke: ${(props) => props.theme.primary};
  }
`;

const ViewerContainer = styled.div`
  z-index: 300;
  position: fixed;
  top: ${(props) => (props.isShow ? "50%" : "70%")};
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center left;
  scale: ${(props) => (props.isShow ? "1" : "0.7")};
  opacity: ${(props) => (props.isShow ? "1" : "0")};

  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.foreground};
  border-radius: 12px;
  padding: 24px 24px 0 24px;

  width: 60%;
  height: 90%;

  user-select: ${(props) => (props.isShow ? "auto" : "none")};
  pointer-events: ${(props) => (props.isShow ? "auto" : "none")};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  transition: ${(props) => (props.dragging ? "none" : "all 0.3s ease")};
`;

const ViewerTitle = styled.div`
  color: ${(props) => props.theme.titleText};
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
  margin-bottom: 8px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ViewerInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
`;

const ViewerInfoItem = styled.div`
  color: ${(props) => props.theme.subText};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.5px;
`;

const ViewerDivider = styled.div`
  height: 1px;
  background-color: ${(props) =>
    props.theme.mode === "light" ? "#00000020" : "#ffffff20"};
  margin-bottom: 12px;
  border-radius: 1px;
`;

const ViewerContentWrapper = styled.div`
  word-break: break-all;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  letter-spacing: -0.5px;
  height: 100%;
  padding-bottom: 40px;

  overflow-y: scroll;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
`;

const ViewerContent = styled.div`
  filter: ${(props) =>
    props.theme.mode === "dark" ? "invert(1)" : "invert(0)"};
  .vw-con img {
    filter: ${(props) =>
      props.theme.mode === "dark" ? "invert(1)" : "invert(0)"};
  }
`;

const NoticeAttachedFile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`;

const NoticeAttachedFileItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const NoticeAttachedFileItemNameWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 320px;
  gap: 4px;

  padding: 8px 16px 8px 4px;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 4px;
  text-decoration: none;

  &:hover {
    background-color: ${(props) =>
      props.theme.mode === "light"
        ? props.theme.secondary + "80"
        : "#00000040"};
  }

  &:active {
    filter: brightness(0.8);
  }
`;

const NoticeAttachedFileItemName = styled.div`
  color: ${(props) => props.theme.primary};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoticeAttachedFileItemViewButton = styled.a`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: max-content;
  padding: 8px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 4px;

  color: #ffffff;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.5px;
  text-decoration: none;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.8);
  }

  ${(props) =>
    props.disabled &&
    css`
      cursor: default;
      user-select: none;
      pointer-events: none;
      background-color: ${(props) => props.theme.subText};
      color: ${(props) => props.theme.contentText};
      opacity: 0.5;
      &:hover {
        filter: brightness(1);
      }
      &:active {
        filter: brightness(1);
      }
    `}
`;

const FloatButtonWrapper = styled.div`
  width: auto;
  position: absolute;
  top: 0;
  left: calc(100% + 16px);

  display: flex;
  flex-direction: column;
  gap: 16px;

  ${(props) => 
    props.isClosed &&
    css`
      scale: 0;
    `}

`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const LoadingText = styled.div`
  color: ${(props) => props.theme.titleText};
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -2px;
  transform: translateY(64px);
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { AttachedFileIcon, ViewerContainer, ViewerTitle, ViewerInfo, ViewerInfoItem, ViewerDivider, ViewerContentWrapper, ViewerContent, NoticeAttachedFile, NoticeAttachedFileItem, NoticeAttachedFileItemNameWrapper, NoticeAttachedFileItemName, NoticeAttachedFileItemViewButton, FloatButtonWrapper, LoadingWrapper, LoadingText, ToastContainer };
