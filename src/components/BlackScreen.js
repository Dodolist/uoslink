import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BlackScreenWrap = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000;
  opacity: ${(props) => props.isOpen ? '0.5' : '0'};
  user-select: ${(props) => props.isOpen ? 'auto' : 'none'};
  pointer-events: ${(props) => props.isOpen ? 'auto' : 'none'};
`

const BlackScreen = ({ isOpen }) => {
  return (
    <BlackScreenWrap isOpen={isOpen}/>
  );
};

export default BlackScreen;
