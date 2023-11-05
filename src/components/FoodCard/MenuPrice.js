import React from 'react'
import styled, {css} from 'styled-components'

const PriceText = styled.span`
  color: ${(props) => props.theme.contentText};
  font-size: 12px;
  letter-spacing: -0.5px;
  ${props => props.type === 'sub' && css`
    color: ${(props) => props.theme.subText};
  `}
`

const MenuPrice = ({ price, type }) => {
  return (
    <PriceText type={type}>{price}</PriceText>
  )
}

export default MenuPrice;
