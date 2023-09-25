import React from 'react';
import styled from 'styled-components';

const SelectedSectionWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SelectedSectionIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const SelectedSectionName = styled.span`
  color: ${(props) => props.theme.titleText};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -2px;
`;

const SelectedSection = ({ selectedSectionIcon, selectedSectionName }) => {
  return (
    <SelectedSectionWrap>
      <SelectedSectionIcon src={selectedSectionIcon} />
      <SelectedSectionName>{selectedSectionName}</SelectedSectionName>
    </SelectedSectionWrap>
  );
};

export default SelectedSection;
