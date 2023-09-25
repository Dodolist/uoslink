import React from 'react'
import styled from 'styled-components'
import leftArrowIcon from '../../images/left-arrow-icon.svg';
import rightArrowIcon from '../../images/right-arrow-icon.svg';

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: ${(props) => props.theme.mode === 'light' ?  '#ffffff' : '#1d2128' } ;
  border-radius: 8px;
  flex-grow: 1;
  gap: 12px;
`

const DateText = styled.span`
  color: ${(props) => props.theme.contentText};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.5px;
`

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;

  &:first-child {
    opacity: ${(props) => (props.day === '일' ? '0.2' : '1')};
    user-select: ${(props) => (props.day === '일' ? 'none' : 'auto')};
    pointer-events: ${(props) => (props.day === '일' ? 'none' : 'auto')};
  }
  &:last-child {
    opacity: ${(props) => (props.day === '토' ? '0.2' : '1')};
    user-select: ${(props) => (props.day === '토' ? 'none' : 'auto')};
    pointer-events: ${(props) => (props.day === '토' ? 'none' : 'auto')};
  }
`

const DateInputBox = ({ selectedFoodDate, changePrevDate, changeNextDate }) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const formattedDate = selectedFoodDate.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
  const date = new Date(formattedDate);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const text = `${date.getMonth() + 1}.${date.getDate()} (${dayOfWeek})`;

  return (
    <DateWrapper>
      <ArrowIcon
        day={dayOfWeek}
        className="icon"
        src={leftArrowIcon}
        onClick={changePrevDate}
      />
      <DateText>{text}</DateText>
      <ArrowIcon
        day={dayOfWeek}
        className="icon"
        src={rightArrowIcon}
        onClick={changeNextDate}
      />
    </DateWrapper>
  );
};

export default DateInputBox;
