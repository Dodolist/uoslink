import React from 'react'
import styled, {css} from 'styled-components'
import leftArrowIcon from '../../images/left-arrow-icon.svg';
import rightArrowIcon from '../../images/right-arrow-icon.svg';

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 8px;
  flex-grow: 1;
  gap: 12px;
`

const DateText = styled.span`
  color: #a0a0a0;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.5px;
`

const DateInputBox = () => {
  return (
    <DateWrapper>
      <img className="icon" src={leftArrowIcon} />
      <DateText>09.01 (수)</DateText>
      <img className="icon" src={rightArrowIcon} />
    </DateWrapper>
  );
};

export default DateInputBox;
