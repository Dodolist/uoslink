import React from 'react'
import styled, {css} from 'styled-components'

const PriceText = styled.span`
  color: #606060;
  font-size: 12px;
  letter-spacing: -0.5px;
  ${props => props.type === 'sub' && css`
    color: #a0a0a0;
    font-size: 10px;
  `}
`

const MenuPrice = ({ price, type }) => {
  return (
    <PriceText type={type}>{price}</PriceText>
  )
}

export default MenuPrice;
