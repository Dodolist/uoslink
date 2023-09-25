import React from 'react';
import { BlackScreenContainer } from './style'

const BlackScreen = ({ isOpen }) => {
  return (
    <BlackScreenContainer isOpen={isOpen}/>
  );
};

export default BlackScreen;
