import React from 'react'
import styled from 'styled-components'

const FloatButtonWrapper = styled.div`
  position: relative;
  background-color: ${props => props.active ? '#f0f1f500' : props.theme.foreground};
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;

  width: 48px;
  height: 48px;

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
    content: '';
    width: ${props => props.active ? '68px' : '0px'};
    height: ${props => props.active ? '68px' : '0px'};
    opacity: ${props => props.active ? '1' : '0'};
    background-color: #408cff;
    border-radius: 50%;
    user-select: none;
  }
`
const FloatButtonIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: ${props => props.active ? 'brightness(2)' : 'brightness(1)'};
`

const FloatButton = ({ icon, active, onClick }) => {
  return (
    <FloatButtonWrapper active={active} onClick={onClick}>
      <FloatButtonIcon src={icon} active={active} />
    </FloatButtonWrapper>
  )
}

export default FloatButton;
