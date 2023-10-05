import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ProgressBar from '../../images/red-progress-bar.js';

const MainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 8px;
  flex-grow: 1;
  flex-basis: 0;
  background-color: ${(props) => props.theme.mode === 'light' ?  '#f6f7fb' : '#292c33' } ;

  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  opacity: ${(props) => props.isShow ? 1 : 0};
  transform: translateY(${(props) => props.isShow ? 0 : 8}px);
  ${(props) => props.isShow && css`
    transition-delay: ${(props) => props.delay}s;
    transition-duration: 0.5s;
  `}
`

const LibraryRoomName = styled.div`
  color: ${(props) => props.theme.titleText};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
`

const LibrarySeat = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.subText};
  font-size: 12px;
  letter-spacing: -1px;
  margin-bottom: 16px;
`

const LibraryRateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

const ProgressWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 16px;
  height: 16px;
`

const Progress = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  fill: transparent;
  stroke-dasharray: 44;
  stroke-dashoffset: 44;
  stroke-dashoffset: ${(props) => props.dashoffset};
  transition: stroke-dashoffset 0.5s linear;
  transform: scaleX(-1);
  opacity: ${(props) => props.background ? 0.2 : 1};

  & > path { stroke: #408cff; }
  ${(props) => props.color === 'red' && css`
    & > path { stroke: #ff5a5f; }
  `}
  ${(props) => props.color === 'yellow' && css`
    & > path { stroke: #ffb800; }
  `}
`

const LibraryRate = styled.div`
  color: #408cff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -1px;

  ${(props) => props.color === 'red' && css`
    color: #ff5a5f;
  `}
  ${(props) => props.color === 'yellow' && css`
    color: #ffb800;
  `}
`


const MainInfo = ({ isShow, delay, item, dashOffset, dashColor }) => {
  const [useRateText, setUseRateText] = useState('여유');
  useEffect(() => {
    switch(dashColor) {
      case 'red':
        setUseRateText('혼잡');
        break;
      case 'yellow':
        setUseRateText('보통');
        break;
      default:
        setUseRateText('여유');
        break;
    }
  }, [dashColor]);
  return(
    <MainInfoContainer
      isShow={isShow}
      delay={delay}
      dashoffset={dashOffset}
    >
      <LibraryRoomName>{ item.room_name }</LibraryRoomName>
      <LibrarySeat>
        { item.use_seat } / { item.total_seat }
      </LibrarySeat>
      <LibraryRateWrapper>
        <ProgressWrapper>
          <Progress
            dashoffset={dashOffset}
            color={dashColor}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ProgressBar />
          </Progress>
          <Progress
            dashoffset="0"
            color={dashColor}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            background="true"
          >
            <ProgressBar />
          </Progress>
        </ProgressWrapper>
        <LibraryRate
          dashoffset={dashOffset}
          color={dashColor}
        >
          {useRateText}
        </LibraryRate>
      </LibraryRateWrapper>
    </MainInfoContainer>
  );
};

export default MainInfo;
