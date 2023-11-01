import React, { useEffect, useState } from 'react';
import { SelectedSectionContainer, SelectedSectionWrap, SelectedSectionIcon, SelectedSectionName } from './style';

const SelectedSection = ({ selectedSectionIcon, selectedSectionName }) => {

  const [isDisappear, setIsDisappear] = useState(false);
  const [selectedSectionInfo, setSelectedSectionInfo] = useState([]);

  useEffect(() => {
    const newSection = {
      icon: selectedSectionIcon,
      name: selectedSectionName
    };

    setIsDisappear(true);

    const updatedInfo = [...selectedSectionInfo, newSection];

    setSelectedSectionInfo(updatedInfo);

    setTimeout(() => {
      setSelectedSectionInfo([updatedInfo[updatedInfo.length - 1]]);
      setIsDisappear(false);
    }, 400);
  }, [selectedSectionIcon, selectedSectionName]);

  return (
    <SelectedSectionContainer>
      { selectedSectionInfo.map((section, index) => (
        <SelectedSectionWrap key={index} isDisappear={isDisappear}>
          <SelectedSectionIcon src={section.icon} />
          <SelectedSectionName>{section.name}</SelectedSectionName>
        </SelectedSectionWrap>
      ))}
    </SelectedSectionContainer>
  );
};

export default SelectedSection;
