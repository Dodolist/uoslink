import React from 'react';
import Modal from '../../Modal';
import { ButtonWrap } from '../style';
import Button from '../../Buttons';

const ConfirmModal = ({ isModalOpen, title, subtitle, closeModal, handleConfirm }) => {


  return (
    <Modal
      isOpen={isModalOpen}
      title={title}
      subtitle={subtitle}
    >
      <ButtonWrap>
        <Button onClick={closeModal}>취소</Button>
        <Button color={"red"} onClick={handleConfirm}>
          삭제
        </Button>
      </ButtonWrap>
    </Modal>
  );
};

export default ConfirmModal;
