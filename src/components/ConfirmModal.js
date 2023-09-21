import React from 'react';
import styled, { css } from 'styled-components';

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

const Button = styled.button`
  color: ${(props) => props.theme.titleText};
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -1px;

  width: 100%;
  padding: 20px 0;
  background-color: ${(props) => props.theme.foreground};

  border: none;
  border-radius: 12px;
  outline: none;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    transition: all 0.05s;
    filter: brightness(0.8);
  }

  ${(props) => props.color === 'blue' && css`
    color: #ffffff;
    background-color: #408cff;
  `}
  ${(props) => props.color === 'red' && css`
    color: #ffffff;
    background-color: #ff5a5f;
  `}
  ${(props) => props.type === true && css`
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
  `}
`

const ConfirmModal = ({ isConfirmModalOpen, title, content, closeConfirmModal }) => {

  const deleteAllNotices = () => {
    localStorage.removeItem('noticeId');
    closeConfirmModal();
    window.location.reload();
  };

  return (
    <ConfirmModalWrap isOpen={isConfirmModalOpen}>
      <ModalTitle>{title}</ModalTitle>
      <ModalContent>{content}</ModalContent>
      <ButtonWrap>
        <Button onClick={closeConfirmModal}>취소</Button>
        <Button color={"red"} onClick={deleteAllNotices}>
          삭제
        </Button>
      </ButtonWrap>
    </ConfirmModalWrap>
  );
};

export default ConfirmModal;
