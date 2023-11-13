import React from 'react';
import { ModalContainer, TextWrap, Text } from './style';
import BlackScreen from '../BlackScreen';

const Modal = ({ isOpen, closeConfirmModal, title, subtitle, children }) => {
  return (
    <>
      <BlackScreen isOpen={isOpen} onClick={closeConfirmModal} />
      <ModalContainer isOpen={isOpen}>
        <TextWrap>
          <Text> {title} </Text>
          <Text sub={true}> {subtitle} </Text>
        </TextWrap>
        {children}
      </ModalContainer>
    </>
  );
};

export default Modal;
