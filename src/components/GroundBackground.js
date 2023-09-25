import React from 'react';
import styled from 'styled-components';

const GroundBackgroundContainer = styled('div')`
    transition: all 0.3s;
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.background};
`

const GroundBackground = () => {
  return (
    <GroundBackgroundContainer>
    </GroundBackgroundContainer>
  )
};

export default GroundBackground;
