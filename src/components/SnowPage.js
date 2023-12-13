import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import bottomSnow1 from '../images/bottom-snow-1.png';
import bottomSnow2 from '../images/bottom-snow-2.png';
import snow1 from '../images/snow-1.svg';
import snow2 from '../images/snow-2.svg';
import snow3 from '../images/snow-3.svg';

const SnowPageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0%;
  z-index: -1;

  opacity: ${(props) => (props.isActive ? '1' : '0')};
`

const BottomSnow1 = styled.img`
  position: fixed;
  bottom: ${(props) => (props.isActive ? '-7%' : '-15%')};
  right: -10%;
  width: 80%;
  z-index: 0;
  user-select: none;
  pointer-events: none;
  opacity: 1;
  &:hover {
    opacity: 0.5;
  }
  ${(props) => props.theme.mode === 'dark' && `
    filter: brightness(0.6);
  `}
`;

const BottomSnow2 = styled.img`
  position: fixed;
  bottom: ${(props) => (props.isActive ? '-15%' : '-23%')};
  left: -10%;
  width: 80%;
  z-index: -1;
  opacity: 0.5;
  user-select: none;
  pointer-events: none;
  ${(props) => props.theme.mode === 'dark' && `
    filter: brightness(0.6);
  `}
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

const SnowPage = ({ activeSnow }) => {
  const snowflakes = [];
  for (let i = 0; i < 32; i++) {
    const delay = Math.random() * 12 + 4;
    const imgNumber = Math.floor(Math.random() * 3) + 1;
    snowflakes.push(<Snowflake key={i} delay={delay} imgNumber={imgNumber} />);
  }
  return (
    <SnowPageContainer isActive={activeSnow}>
      {snowflakes && activeSnow && snowflakes}
      <BottomSnow1 src={bottomSnow1} isActive={activeSnow} />
      <BottomSnow2 src={bottomSnow2} isActive={activeSnow} />
    </SnowPageContainer>
  );
};

export default React.memo(SnowPage);
