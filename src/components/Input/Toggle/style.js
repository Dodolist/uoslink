import styled from 'styled-components'

const ToggleSwitch = styled.label`
  transition: all 0.3s;
  position: relative;
  display: flex;
  align-items: center;
  width: 32px;
  height: 16px;
  border-radius: 12px;
  cursor: pointer;
  background-color: ${props => props.active ? '#408cff' : props.theme.mode === 'light' ? '#e5e6ec' : '#5d616f' };
`

const ToggleSwtichButton = styled.div`
  transition: all 0.3s;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ffffff;
  transform: ${props => props.active ? 'translateX(18px)' : 'translateX(2px)'};
`

export { ToggleSwitch, ToggleSwtichButton };
