import styled from 'styled-components';

const ConfirmModalWrap = styled.div`
  z-index: 300;
  min-width: 340px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${(props) => props.isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -55%)'};
  opacity: ${(props) => props.isOpen ? '1' : '0'};
  user-select: ${(props) => props.isOpen ? 'auto' : 'none'};
  pointer-events: ${(props) => props.isOpen ? 'auto' : 'none'};

  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.mode === 'light' ? '#ffffff' : '#1d2128'};
  border-radius: 12px;
  padding: 24px 24px 16px 24px;
`

const ModalTitle = styled.div`
  color: ${(props) => props.theme.titleText};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
  letter-spacing: -1px;
`

const ModalContent = styled.div`
  color: ${(props) => props.theme.subText};
  font-size: 18px;
  margin-bottom: 16px;
  letter-spacing: -1.5px;
`

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  gap: 12px;
`

export { ConfirmModalWrap, ModalTitle, ModalContent, ButtonWrap };
