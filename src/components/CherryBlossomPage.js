import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import lightCherryBlossomTree1 from '../images/light-CherryBlossom-tree-1.png';
import lightCherryBlossomTree2 from '../images/light-CherryBlossom-tree-2.png';
import darkCherryBlossomTree1 from '../images/dark-CherryBlossom-tree-1.png';
import darkCherryBlossomTree2 from '../images/dark-CherryBlossom-tree-2.png';

const CherryBlossomPageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  opacity: ${(props) => (props.isActive ? '1' : '0')};
  @media (max-width: 1440px) {
    & > img:first-child {
      width: 360px;
    }
    & > img:last-child {
      width: 320px;
    }
  }
`

const CherryBlossomLeft = styled.img`
  position: fixed;
  left: ${(props) => (props.isActive ? '0' : '-5%')};
  bottom: 0;
  z-index: 0;
  user-select: none;
  pointer-events: none;
  opacity: ${(props) => (props.isActive ? '1' : '0')}
`;

const CherryBlossomRight = styled.img`
  position: fixed;
  right: ${(props) => (props.isActive ? '0' : '-5%')};
  bottom: 0;
  z-index: -1;
  user-select: none;
  pointer-events: none;
  opacity: ${(props) => (props.isActive ? '1' : '0')}
`;

const snowflakeAnimation = keyframes`
  from {
    top: -24px;
  }
  to {
    top: calc(100% + 24px);
  }
`;

const SnowflakeImg = styled.img`
  position: absolute;
  top: -24px;
  animation: ${snowflakeAnimation} linear infinite;
  ${(props) => props.theme.mode === 'dark' && `
    opacity: 0.5;
  `}
`;

/*
const Snowflake = ({ delay, imgNumber }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(Math.random() * 0.4 + 0.8);

  useEffect(() => {
    const x = Math.random() * 100;
    const y = Math.random() * window.innerHeight;
    setPosition({ x, y });
  }, []);

  const animationSpeed = Math.random() * 12 + 12;

  const blur = Math.random() * 2 * size;

  const SnowflakeStyle = {
    animationDelay: `${delay}s`,
    animationDuration: `${animationSpeed}s`,
    left: `${position.x}vw`,
    scale: `${size}`,
    filter: `blur(${blur}px)`,
  };

  // snow1, snow2, snow3 중 랜덤으로 선택
  switch (imgNumber) {
    case 1:
      return (
        <SnowflakeImg src={snow1} style={SnowflakeStyle} />
      );
    case 2:
      return (
        <SnowflakeImg src={snow2} style={SnowflakeStyle} />
      );
    case 3:
      return (
        <SnowflakeImg src={snow3} style={SnowflakeStyle} />
      );
  }

};
*/

const CherryBlossomPage = ({ theme, custom }) => {
  const [cherryBlossomTree1, setCherryBlossomTree1] = useState(lightCherryBlossomTree1);
  const [cherryBlossomTree2, setCherryBlossomTree2] = useState(lightCherryBlossomTree2);

  useEffect(() => {
    if (theme === 'dark') {
      setCherryBlossomTree1(darkCherryBlossomTree1);
      setCherryBlossomTree2(darkCherryBlossomTree2);
    } else {
      setCherryBlossomTree1(lightCherryBlossomTree1);
      setCherryBlossomTree2(lightCherryBlossomTree2);
    }
  }, [theme]);
  /*
  const snowflakes = [];
  for (let i = 0; i < 32; i++) {
    const delay = Math.random() * 12 + 4;
    const imgNumber = Math.floor(Math.random() * 3) + 1;
    snowflakes.push(<Snowflake key={i} delay={delay} imgNumber={imgNumber} />);
      {snowflakes && custom && snowflakes}
  }
  */
  return (
    <CherryBlossomPageContainer isActive={custom === 'custom'}>
      <CherryBlossomLeft src={cherryBlossomTree1} isActive={custom === 'custom'} />
      <CherryBlossomRight src={cherryBlossomTree2} isActive={custom === 'custom'} />
    </CherryBlossomPageContainer>
  );
};

export default React.memo(CherryBlossomPage);
