import React, { useState } from 'react';
import { ToggleSwitch, ToggleSwtichButton } from './style';

const Toggle = ({ active, handleClick }) => {
  return (
    <ToggleSwitch active={active} onClick={handleClick} >
      <ToggleSwtichButton active={active} />
    </ToggleSwitch>
  );
};

export default Toggle;
