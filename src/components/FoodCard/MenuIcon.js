import React from 'react'
import styled from 'styled-components'
import cutletIcon from '../../images/cutlet-icon.svg';
import pastaIcon from '../../images/pasta-icon.svg';
import sideIcon from '../../images/side-icon.svg';

const Icon = styled.img`
  width: 24px;
  height: 24px;
`

const MenuIcon = ({ type }) => {
  switch(type) {
    case 'cutlet':
      return <Icon src={cutletIcon} />
    case 'pasta':
      return <Icon src={pastaIcon} />
    case 'side':
      return <Icon src={sideIcon} />
    default:
      return null;
  }
};

export default MenuIcon;
