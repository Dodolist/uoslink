import React from 'react'
import styled from 'styled-components'
import clockIcon from '../../images/clock-icon.svg';

const OpenTimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  align-self: flex-end;
  gap: 4px;
  margin: 0 4px 4px 0;
`

const OpenTimeText = styled.span`
  color: #a0a0a0;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.5px;
`
const OpenTime = ({ time }) => {
  return (
    <OpenTimeWrapper>
      <img src={clockIcon} />
      <OpenTimeText>{time}</OpenTimeText>
    </OpenTimeWrapper>
  )
};

export default OpenTime;
