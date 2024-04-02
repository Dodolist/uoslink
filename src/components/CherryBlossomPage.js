import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import lightCherryBlossomTree1 from "../images/light-CherryBlossom-tree-1.png";
import lightCherryBlossomTree2 from "../images/light-CherryBlossom-tree-2.png";
import darkCherryBlossomTree1 from "../images/dark-CherryBlossom-tree-1.png";
import darkCherryBlossomTree2 from "../images/dark-CherryBlossom-tree-2.png";
import FlowerFlake from "./FlowerFlake";

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

const FlakeWrapper = styled.div`
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
      <FlowerFlake key={i} delay={delay} />
    );
  }
  return (
    <CherryBlossomPageContainer isActive={custom === "custom"}>
      <FlakeWrapper>
        {custom && flowerflakes}
      </FlakeWrapper>
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
