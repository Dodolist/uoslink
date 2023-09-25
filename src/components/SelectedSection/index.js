import React from 'react';
import { SelectedSectionWrap, SelectedSectionIcon, SelectedSectionName } from './style';

const SelectedSection = ({ selectedSectionIcon, selectedSectionName }) => {
  return (
    <SelectedSectionWrap>
      <SelectedSectionIcon src={selectedSectionIcon} />
      <SelectedSectionName>{selectedSectionName}</SelectedSectionName>
    </SelectedSectionWrap>
  );
};

export default SelectedSection;
