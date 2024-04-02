import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import flower1 from "../images/flower1.svg";
import flower2 from "../images/flower2.svg";
import flower3 from "../images/flower3.svg";
import flower4 from "../images/flower4.svg";

const flowerXMoveAnimation = keyframes`
  0% {
    margin-left: 0;
    transform: rotate3d(1, 1, 1, 0deg);
  }
  10% {
    margin-left: 20px;
  }
  20% {
    margin-left: -40px;
  }
  30% {
    margin-left: 60px;
  }
  40% {
    margin-left: -80px;
  }
  50% {
    margin-left: 100px;
    transform: rotate3d(1, 1, 1, 90deg);
  }
  60% {
    margin-left: -80px;
  }
  70% {
    margin-left: 60px;
  }
  80% {
    margin-left: -40px;
  }
  90% {
    margin-left: 20px;
  }
  100% {
    margin-left: 0;
    transform: rotate3d(1, 1, 1, 0deg);
  }
`;

const flowerFlakeAnimation = keyframes`
  from {
    top: -64px;
  }
  to {
    top: calc(100% + 64px);
  }
`;

const FlowerFlaskImg = styled.img`
  position: absolute;
  top: -64px;
  animation: ${flowerFlakeAnimation} linear infinite,
    ${flowerXMoveAnimation} 4s ease-in-out infinite;
`;

const FlowerFlake = ({ delay }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(Math.random() * 0.3 + 0.3);

  useEffect(() => {
    const x = Math.random() * 100;
    const y = Math.random() * window.innerHeight;
    setPosition({ x, y });
  }, []);

  const animationSpeed = -40 * size + 48;
  const blur = -10 * size + 6;
  const rotate = Math.random() * 360;

  const FlowerFlakeStyle = {
    animationDelay: `${delay}s`,
    animationDuration: `${animationSpeed}s`,
    left: `${position.x}vw`,
    scale: `${size}`,
    filter: `blur(${blur}px)`,
    rotate: `${rotate}deg`,
  };

  const imgNumber = Math.floor(Math.random() * 4) + 1;
  // flower1, flower2, flower3 중 랜덤으로 선택
  switch (imgNumber) {
    case 1:
      return (<FlowerFlaskImg src={flower1} style={FlowerFlakeStyle} />);
    case 2:
      return (<FlowerFlaskImg src={flower2} style={FlowerFlakeStyle} />);
    case 3:
      return (<FlowerFlaskImg src={flower3} style={FlowerFlakeStyle} />);
    case 4:
      return (<FlowerFlaskImg src={flower4} style={FlowerFlakeStyle} />);
  }
};

export default React.memo(FlowerFlake);
