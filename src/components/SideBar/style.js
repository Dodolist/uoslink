import styled from 'styled-components';

const SideBarContainer = styled.div`
  z-index: 100;
  position: fixed;
  top: 50%;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.foreground};
  border-radius: 8px 0 0 8px;
  padding: 8px;
  gap: 40px;
  transform: ${(props) => (props.isOpen ? 'translate(0, -50%)' : 'translate(100%, -50%)')};
  user-select: ${(props) => (props.isOpen ? 'auto' : 'none')};
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};
`

const ShortCutList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
`

const ShortCutWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  background-color: ${(props) => props.theme.mode === 'light' ? '#ffffff' : '#5d616f'};
  border-radius: 8px;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
`

const ShortCutIconWrap = styled.a`
  width: 32px;
  height: 32px;
`

const ShortCutIcon = styled.img`
  width: 100%;
  height: 100%;
  padding: 4px;
  border-radius: 12px;
  user-select: none;
`

const ShortCutLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: max-content;
  position: absolute;
  top: 50%;
  left: -25%;
  padding: 8px 8px 8px 12px;
  border-radius: 4px;
  background-color: #3c414c;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -1px;

  gap: 2px;

  transform: ${(props) => props.isHovered ? 'translate(-100%, -50%) scale(1)' : 'translate(0%, -50%) scale(0.8)'};
  transform-orgin: ${(props) => props.isHovered ? 'right top' : 'left top'};
  opacity: ${(props) => props.isHovered ? '1' : '0'};
`

const AddButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.theme.background };
  border-radius: 8px;

  cursor: pointer;

  &:hover {
    filter: ${(props) => props.theme.mode === 'light' ? 'brightness(0.9)' : 'brightness(1.8)'};
  }
  &:active {
    filter: ${(props) => props.theme.mode === 'light' ? 'brightness(0.8)' : 'brightness(2)'};
  }
`
const AddButton = styled.img`
  width: 14px;
  height: 14px;
  user-select: none;
  filter: ${(props) => props.theme.mode === 'light' ? '' : 'brightness(0.5)'};
`

export { SideBarContainer, ShortCutList, ShortCutWrap, ShortCutIconWrap, ShortCutIcon, ShortCutLabel, AddButtonWrap, AddButton };
