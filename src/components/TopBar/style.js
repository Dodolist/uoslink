import styled, { keyframes } from "styled-components";

// 글자 배경색 바뀌는 애니메이션 제작
const blink = keyframes`
  0% {
    background-position: 0 0;
  } 
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

const TopBarContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 1280px;
  padding: 16px;
  margin: 0 auto;
  border-radius: 0 0 8px 8px;
  background-color: ${(props) => props.theme.foreground}f4;
  background-color: ${(props) =>
    props.theme.custom === "default"
      ? props.theme.foreground + "f4"
      : props.theme.foreground};
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.05);
`;

const TopBarLeft = styled("div")`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  flex-shrink: 0;
`;

const ImgWrap = styled("div")`
  position: relative;
  display: flex;
`;

const ServiceName = styled("span")`
  color: ${(props) => props.theme.subText};
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -1px;
  user-select: none;

  animation: ${blink} 10s infinite;
  background: linear-gradient(90deg, #a9adb9 20%, #d1d6e6 50%, #a9adb9 80%);
  background-size: 400% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  ${(props) =>
    props.theme.mode === "dark" &&
    `
    background: linear-gradient(90deg, #5d616f 20%, #d1d6e6 50%, #5d616f 80%);
    background-size: 400% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`;

export { TopBarContainer, TopBarLeft, ImgWrap, ServiceName };
