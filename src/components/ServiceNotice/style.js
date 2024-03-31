import styled, { css } from "styled-components";

const ServiceNoticeWrap = styled("div")`
  position: absolute;
  width: max-content;
  z-index: 100;
  left: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  transform-origin: center left;
  padding: 8px 12px 8px 8px;
  margin-left: 8px;
  background-color: #373737;
  border-radius: 4px;
  gap: 4px;

  cursor: pointer;
  user-select: none;

  transition: opacity 2s ease-in-out, transform 2s ease-in-out;
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  transform: ${(props) => (props.isShow ? "scaleX(1)" : "scaleX(0)")};
`;

const TailIconWrap = styled("img")`
  position: absolute;
  top: 50%;
  right: calc(100% - 2px);
  transform: translateY(-50%);
  width: 7px;
  height: 12px;
`;

const ServiceNoticeText = styled("span")`
  color: #ffffff;
  font-size: 12px;
  letter-spacing: -1px;

  transition: ${(props) =>
    props.isShow ? "opacity 1s 2s ease-in-out" : "opacity 1s ease-in-out"};
  opacity: ${(props) => (props.isShow ? 1 : 0)};

  ${(props) =>
    props.type === "blue" &&
    css`
      display: flex;
      flex-direction: row;
      align-items: center;
      color: ${(props) => props.theme.primary};
      font-weight: bold;
    `}
`;

export { ServiceNoticeWrap, TailIconWrap, ServiceNoticeText };
