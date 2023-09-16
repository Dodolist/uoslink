import React from 'react'
import styled, {css} from 'styled-components'
import foodIcon from '../../images/white-food-icon.svg';
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

const TopBar = () => {
  return (
    <FoodCardTopBar>
      <CardTopBarLeft>
        <img src={foodIcon} />
        <CardTitle>학식</CardTitle>
      </CardTopBarLeft>
      <img className="icon" src={closeIcon} />
    </FoodCardTopBar>
  );
};

export default TopBar;
