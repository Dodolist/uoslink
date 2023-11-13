import React from 'react';
import { SettingItemContainer, SettingItemTitle } from './style';

const SettingItem = ({ title, caution, handleClick, children }) => {
  return (
    <SettingItemContainer>
      <SettingItemTitle
        onClick={handleClick}
        caution={caution}>{title}</SettingItemTitle>
      { children }
    </SettingItemContainer>
  );
}

export default SettingItem;
