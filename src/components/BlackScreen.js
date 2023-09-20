import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BlackScreenWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000;
  opacity: 0.5;
  user-select: none;
  pointer-events: none;
`

const BlackScreen = () => {
  return (
    <BlackScreenWrap />
  );
};

export default BlackScreen;
