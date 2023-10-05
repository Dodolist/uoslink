import React from 'react';
import styled, { css } from 'styled-components';

const SubInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
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
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -2px;
`

const LibrarySeat = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.subText};
  font-size: 10px;
  letter-spacing: -1px;
  margin-bottom: 8px;
`

const LinearProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  margin: 0 8px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.mode === 'light' ?  '#ffffff' : '#1d2128' } ;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${(props) => props.dashOffset ? props.dashOffset : 0}%;
    border-radius: 2px;
    background-color: ${(props) => props.theme.secondary};
    ${(props) => props.isShow && css`
      transition: all 0.5s linear;
      transition-delay: ${(props) => props.delay}s;
    `}
  }
`
const SubInfo = ({ isShow, delay, item, dashOffset }) => {
  return (
    <SubInfoContainer
      isShow={isShow}
      delay={delay}
      dashoffset={dashOffset}
    >
      <LibraryRoomName>{ item.room_name }</LibraryRoomName>
      <LibrarySeat>
        { item.use_seat } / { item.total_seat }
      </LibrarySeat>
      <LinearProgressBar
        isShow={isShow}
        delay={delay + 0.5}
        dashOffset={dashOffset}
      />
    </SubInfoContainer>
  );
}

export default SubInfo;
