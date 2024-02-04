import React from 'react';
import { BlackScreenContainer } from './style'

const BlackScreen = ({ isOpen, method }) => {
  return (
    <BlackScreenContainer isOpen={isOpen} onClick={method} touchable={method} />
  );
};

export default BlackScreen;
