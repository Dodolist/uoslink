import React from 'react'
import styled, {css} from 'styled-components'

const NameText = styled.span`
  color: #606060;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
  ${props => props.type === 'sub' && css`
    color: #a0a0a0;
    font-size: 12px;
    letter-spacing: -0.5px;
  `}
`

const MenuName = ({ name, type }) => {
  return (
    <NameText type={type}>{name}</NameText>
  )
};

export default MenuName;
