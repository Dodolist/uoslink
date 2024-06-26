import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import lightCherryBlossomTree1 from "../images/light-CherryBlossom-tree-1.png";
import lightCherryBlossomTree2 from "../images/light-CherryBlossom-tree-2.png";
import darkCherryBlossomTree1 from "../images/dark-CherryBlossom-tree-1.png";
import darkCherryBlossomTree2 from "../images/dark-CherryBlossom-tree-2.png";
import FlowerFlake from "./FlowerFlake";

const leftTreeMove = keyframes`
  0% {
    bottom: -10%;
    opacity: 0;
  }
  100% {
    bottom: 0;
    opacity: 1;
  }
`;

const rightTreeMove = keyframes`
  0% {
    bottom: -10%;
    opacity: 0;
  }
  100% {
    bottom: 0;
    opacity: 1;
  }
`;

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

const CherryBlossomLeft = styled.img`
  position: fixed;
  left: ${(props) => (props.isActive ? "0" : "-5%")};
  bottom: 0;
  z-index: 0;
  user-select: none;
  pointer-events: none;
  opacity: ${(props) => (props.isActive ? "1" : "0")};

  ${(props) =>
    props.isActive &&
    css`
      animation: ${leftTreeMove} 2s ease-in-out;
    `}
`;

const CherryBlossomRight = styled.img`
  position: fixed;
  right: ${(props) => (props.isActive ? "0" : "-5%")};
  bottom: 0;
  z-index: -1;
  user-select: none;
  pointer-events: none;
  opacity: ${(props) => (props.isActive ? "1" : "0")};
  ${(props) =>
    props.isActive &&
    css`
      animation: ${rightTreeMove} 2s ease-in-out;
    `}
`;

const FlakeWrapper = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${(props) =>
    props.theme.mode === "dark" &&
    `
    opacity: 0.5;
  `}
`;

const CherryBlossomPage = ({ theme, custom }) => {
  const [cherryBlossomTree1, setCherryBlossomTree1] = useState(
    lightCherryBlossomTree1
  );
  const [cherryBlossomTree2, setCherryBlossomTree2] = useState(
    lightCherryBlossomTree2
  );
  const [delay, setDelay] = useState(Math.random() * 18);

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
    flowerflakes.push(<FlowerFlake key={i} delay={delay + 0.6 * i} />);
  }
  return (
    <CherryBlossomPageContainer isActive={custom === "custom"}>
      <FlakeWrapper>{custom && flowerflakes}</FlakeWrapper>
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
