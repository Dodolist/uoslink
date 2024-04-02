import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import lightCherryBlossomTree1 from "../images/light-CherryBlossom-tree-1.png";
import lightCherryBlossomTree2 from "../images/light-CherryBlossom-tree-2.png";
import darkCherryBlossomTree1 from "../images/dark-CherryBlossom-tree-1.png";
import darkCherryBlossomTree2 from "../images/dark-CherryBlossom-tree-2.png";
import flower1 from "../images/flower1.svg";
import flower2 from "../images/flower2.svg";
import flower3 from "../images/flower3.svg";
import flower4 from "../images/flower4.svg";

const CherryBlossomPageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  opacity: ${(props) => (props.isActive ? "1" : "0")};
  @media (max-width: 1440px) {
    & > img:nth-last-child(2) {
      width: 360px;
    }
    & > img:last-child {
      width: 320px;
    }
  }
`;

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

const CherryBlossomLeft = styled.img`
  position: fixed;
  left: ${(props) => (props.isActive ? "0" : "-5%")};
  bottom: 0;
  z-index: 0;
  user-select: none;
  pointer-events: none;
  opacity: ${(props) => (props.isActive ? "1" : "0")};
`;

const CherryBlossomRight = styled.img`
  position: fixed;
  right: ${(props) => (props.isActive ? "0" : "-5%")};
  bottom: 0;
  z-index: -1;
  user-select: none;
  pointer-events: none;
  opacity: ${(props) => (props.isActive ? "1" : "0")};
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
  ${(props) =>
    props.theme.mode === "dark" &&
    `
    opacity: 0.5;
  `}
`;

const Flowerflake = ({ delay }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(Math.random() * 0.3 + 0.3);

  useEffect(() => {
    const x = Math.random() * 100;
    const y = Math.random() * window.innerHeight;
    setPosition({ x, y });
  }, []);

  const animationSpeed = -40 * size + 48;
  const blur = -10 * size + 6;

  const FlowerflakeStyle = {
    animationDelay: `${delay}s`,
    animationDuration: `${animationSpeed}s`,
    left: `${position.x}vw`,
    scale: `${size}`,
    filter: `blur(${blur}px)`,
  };

  const imgNumber = Math.floor(Math.random() * 4) + 1;
  // flower1, flower2, flower3 중 랜덤으로 선택
  switch (imgNumber) {
    case 1:
      return <FlowerFlaskImg src={flower1} style={FlowerflakeStyle} />;
    case 2:
      return <FlowerFlaskImg src={flower2} style={FlowerflakeStyle} />;
    case 3:
      return <FlowerFlaskImg src={flower3} style={FlowerflakeStyle} />;
    case 4:
      return <FlowerFlaskImg src={flower4} style={FlowerflakeStyle} />;
  }
};

const CherryBlossomPage = ({ theme, custom }) => {
  const [cherryBlossomTree1, setCherryBlossomTree1] = useState(
    lightCherryBlossomTree1
  );
  const [cherryBlossomTree2, setCherryBlossomTree2] = useState(
    lightCherryBlossomTree2
  );

  useEffect(() => {
    if (theme === "dark") {
      setCherryBlossomTree1(darkCherryBlossomTree1);
      setCherryBlossomTree2(darkCherryBlossomTree2);
    } else {
      setCherryBlossomTree1(lightCherryBlossomTree1);
      setCherryBlossomTree2(lightCherryBlossomTree2);
    }
  }, [theme]);
  const flowerflakes = [];
  for (let i = 0; i < 32; i++) {
    const delay = Math.random() * 24 + 0.2 * i;
    flowerflakes.push(
      <Flowerflake key={i} delay={delay} />
    );
  }
  return (
    <CherryBlossomPageContainer isActive={custom === "custom"}>
      {flowerflakes && custom && flowerflakes}
      <CherryBlossomLeft
        src={cherryBlossomTree1}
        isActive={custom === "custom"}
      />
      <CherryBlossomRight
        src={cherryBlossomTree2}
        isActive={custom === "custom"}
      />
    </CherryBlossomPageContainer>
  );
};

export default React.memo(CherryBlossomPage);
