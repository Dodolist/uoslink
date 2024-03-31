import React from "react";
import styled from "styled-components";

const FloatButtonWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.foreground};
  padding: 12px;
  border-radius: 12px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  overflow: hidden;

  width: 48px;
  height: 48px;

  filter: ${(props) => (props.disabled ? "brightness(0.7)" : "brightness(1)")};

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
    transform: translateY(2px);
  }
  &::before {
    transition: all 0.3s ease;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: "";
    width: ${(props) => (props.active ? "68px" : "0px")};
    height: ${(props) => (props.active ? "68px" : "0px")};
    opacity: ${(props) => (props.active ? "1" : "0")};
    background-color: ${(props) => props.theme.primary};
    border-radius: 50%;
    user-select: none;
  }
`;
const FloatButtonIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: ${(props) => (props.active ? "brightness(2)" : "brightness(1)")};
`;

const FloatButton = ({ icon, active, disabled, onClick }) => {
  return (
    <FloatButtonWrapper active={active} disabled={disabled} onClick={onClick}>
      <FloatButtonIcon src={icon} active={active} />
    </FloatButtonWrapper>
  );
};

export default FloatButton;
