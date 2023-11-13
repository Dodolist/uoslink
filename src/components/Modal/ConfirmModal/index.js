import React from 'react';
import Modal from '../../Modal';
import { ButtonWrap } from '../style';
import Button from '../../Buttons';

const ConfirmModal = ({ isConfirmModalOpen, title, subtitle, closeConfirmModal }) => {

  const deleteAllNotices = () => {
    // 읽은 모든 공지사항 삭제
    localStorage.removeItem('noticeId');
    closeConfirmModal();
    window.location.reload(); // 새로고침
  };

  return (
    <Modal
      isOpen={isConfirmModalOpen}
      title={title}
      subtitle={subtitle}
    >
      <ButtonWrap>
        <Button onClick={closeConfirmModal}>취소</Button>
        <Button color={"red"} onClick={deleteAllNotices}>
          삭제
        </Button>
      </ButtonWrap>
    </Modal>
  );
};

export default ConfirmModal;
