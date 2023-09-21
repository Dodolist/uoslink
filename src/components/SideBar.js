import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import addIcon from '../images/add-icon.svg';

const SideBarContainer = styled.div`
  z-index: 100;
  position: fixed;
  top: 50%;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.foreground};
  border-radius: 8px 0 0 8px;
  padding: 8px;
  gap: 40px;
  transform: ${(props) => (props.isOpen ? 'translate(0, -50%)' : 'translate(100%, -50%)')};
`

const ShortCutList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;
`

const ShortCutWrap = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  background-color: ${(props) => props.theme.mode === 'light' ? '#ffffff' : '#5d616f'};
  border-radius: 8px;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
`

const ShortCutIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  user-select: none;
`

const ShortCutLabel = styled.div`
  width: max-content;
  position: absolute;
  top: 50%;
  left: -25%;
  transform: translate(-100%, -50%);
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #373737;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;

  opacity: ${(props) => props.isHovered ? '1' : '0'};
  scale: ${(props) => props.isHovered ? '1' : '0.8'};
`

const AddButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.theme.background };
  border-radius: 8px;

  cursor: pointer;

  &:hover {
    filter: ${(props) => props.theme.mode === 'light' ? 'brightness(0.9)' : 'brightness(1.8)'};
  }
  &:active {
    filter: ${(props) => props.theme.mode === 'light' ? 'brightness(0.8)' : 'brightness(2)'};
  }
`
const AddButton = styled.img`
  width: 14px;
  height: 14px;
  user-select: none;
  filter: ${(props) => props.theme.mode === 'light' ? '' : 'brightness(0.5)'};
`

const SideBar = ({ isSideBarOpen, openInputModal, closeInputModal }) => {
  const [sites, setSites] = useState([]);
  const [hoveredShortCut, setHoveredShortCut] = useState(null);

  useEffect(() => {
    const sites = JSON.parse(localStorage.getItem('sites'));
    if (sites === null) {
      localStorage.setItem('sites', JSON.stringify([]));
      return;
    }
    setSites(sites);
  }, [closeInputModal]);
  return (
    <SideBarContainer isOpen={isSideBarOpen}>
      <ShortCutList>
        {sites.map((site) => (
          <ShortCutWrap
            href={site.link}
            onMouseEnter={() => setHoveredShortCut(site.name)}
            onMouseLeave={() => setHoveredShortCut(null)}
          >
            <ShortCutIcon src={`${site.link}/favicon.ico`} />
            <ShortCutLabel isHovered={site.name === hoveredShortCut}>
              {site.name}
            </ShortCutLabel>
          </ShortCutWrap>
        ))}
      </ShortCutList>
      <AddButtonWrap onClick={openInputModal}>
        <AddButton src={addIcon} />
      </AddButtonWrap>
    </SideBarContainer>
  );
};

export default SideBar;
