import styled from 'styled-components';

const BannerImage = styled.img`
  &:last-child {
  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
`

export { BannerImage };
