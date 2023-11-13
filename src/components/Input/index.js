import React from 'react';
import { InputContainer, InputLabel } from './style';

const InputWrap = ({ label, children }) => {
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      {children}
    </InputContainer>
  )
}

export default InputWrap;
