import React from 'react'
import styled from 'styled-components'
import libraryIcon from '../../images/white-library-icon.svg';
import closeIcon from '../../images/white-close-icon.svg';

const FoodCardTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CardTopBarLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
`
const CardTitle = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.5px;
`

const TopBar = ({handleClose}) => {
  return (
    <FoodCardTopBar>
      <CardTopBarLeft>
        <img src={libraryIcon} />
        <CardTitle>도서관</CardTitle>
      </CardTopBarLeft>
      <img className="icon" src={closeIcon} onClick={handleClose} />
    </FoodCardTopBar>
  );
};

export default TopBar;
