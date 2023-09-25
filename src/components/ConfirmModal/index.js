import React from 'react';
import { ConfirmModalWrap, ModalTitle, ModalContent, ButtonWrap } from './style';
import Button from '../Buttons';

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
