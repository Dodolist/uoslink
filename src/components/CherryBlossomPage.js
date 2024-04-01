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
    & > img:first-child {
      width: 360px;
    }
    & > img:last-child {
      width: 320px;
    }
  }
`;

const flowerXYMoveAnimation = keyframes`
  0% {
    margin-left: 0;
    rotate: 0;
  }
  20% {
    margin-left: 80px;
    rotate: 30deg;
  }
  40% {
    margin-left: -120px;
    rotate: -30deg;
  }
  60% {
    margin-left: 120px;
    rotate: 30deg;
  }
  80% {
    margin-left: -80px;
    rotate: -10deg;
  }
  100% {
    margin-left: 0;
    rotate: 0;
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
    top: -40%;
  }
  to {
    top: calc(100% + 100px);
  }
`;

const FlowerFlaskImg = styled.img`
  position: absolute;
  top: -40%;
  animation: ${flowerFlakeAnimation} linear infinite,
    ${flowerXYMoveAnimation} 4s ease-in-out infinite;
  ${(props) =>
    props.theme.mode === "dark" &&
    `
    opacity: 0.5;
  `}
`;

const Flowerflake = ({ delay, imgNumber }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(Math.random() * 0.2 + 0.3);

  useEffect(() => {
    const x = Math.random() * 100;
    const y = Math.random() * window.innerHeight;
    setPosition({ x, y });
  }, []);

  const animationSpeed = Math.random() * 12 + 12;

  const blur = Math.random() * 2 * size;

  const FlowerflakeStyle = {
    animationDelay: `${delay}s`,
    animationDuration: `${animationSpeed}s`,
    left: `${position.x}vw`,
    scale: `${size}`,
    filter: `blur(${blur}px)`,
  };

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
    const delay = Math.random() * 12 + 4;
    const imgNumber = Math.floor(Math.random() * 4) + 1;
    flowerflakes.push(
      <Flowerflake key={i} delay={delay} imgNumber={imgNumber} />
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
