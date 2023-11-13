import styled, { css } from 'styled-components';

const ModalContainer = styled.div`
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

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Text = styled.div`
  color: ${(props) => props.theme.titleText};
  font-size: 18px;
  font-weight: bold;

  ${(props) => props.sub && css`
    color: ${(props) => props.theme.subText};
    font-size: 16px;
    font-weight: 400;
  `}
`

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  gap: 12px;
`

export { ModalContainer, TextWrap, Text, ButtonWrap };
