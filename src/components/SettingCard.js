import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import settingIcon from '../images/white-setting-icon.svg';
import closeIcon from '../images/gray-close-icon.svg';

const SettingCardContainer = styled('div')`
  transition: all 0.3s;
  position: absolute;
  top: 40px;
  right: 0px;
  min-width: 200px;
  min-height: 200px;

  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.mode === 'light' ?  '#ffffff' : '#000000' } ;

  z-index: 100;

  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.boxShadow};

  transform: ${(props) => (props.isshow ? 'translateY(0)' : 'translateY(-24px)')};
  opacity: ${(props) => (props.isshow ? '1' : '0')};
  user-select: ${(props) => (props.isshow ? 'auto' : 'none')};
  pointer-events: ${(props) => (props.isshow ? 'auto' : 'none')};

`

const SettingCardTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px;
  background-color: ${props => props.theme.background};
`

const CardTopBarLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
`
const CardTitle = styled.span`
  color: ${props => props.theme.titleText};
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.5px;
`

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
`

const SettingItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const SettingItemTitle = styled.span`
  color: ${props => props.theme.contentText};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -1.5px;
  user-select: none;
  ${props => props.caution && css`
    color: #ff5a5a;
    cursor: pointer;
    &:hover {
      filter: brightness(0.9);
    }
    &:active {
      filter: brightness(0.8);
    }
  `}
`

const ToggleSwitch = styled.label`
  transition: all 0.3s;
  position: relative;
  display: flex;
  align-items: center;
  width: 32px;
  height: 16px;
  border-radius: 12px;
  background-color: ${props => props.theme.mode === 'light' ? '#E5E6EC' : '#408cff'};
  cursor: pointer;
`

const ToggleSwtichButton = styled.div`
  transition: all 0.3s;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ffffff;
  transform: ${props => props.theme.mode === 'light' ? 'translateX(2px)' : 'translateX(18px)'};
`
const SettingCard = ({isShow, handleClose, toggleTheme}) => {
  return (
    <SettingCardContainer
      isshow={undefined ? undefined : isShow}
    >
      <SettingCardTopBar>
        <CardTopBarLeft>
          <img src={settingIcon} />
          <CardTitle>설정</CardTitle>
        </CardTopBarLeft>
        <img className="icon" src={closeIcon} onClick={handleClose} />
      </SettingCardTopBar>
      <SettingContainer>
        <SettingItem>
          <SettingItemTitle>다크모드 변경</SettingItemTitle>
          <ToggleSwitch onClick={toggleTheme} >
            <ToggleSwtichButton />
          </ToggleSwitch>
        </SettingItem>
        <SettingItem>
          <SettingItemTitle caution={true}>읽은 공지 초기화</SettingItemTitle>
        </SettingItem>
      </SettingContainer>
    </SettingCardContainer>
  );
}

export default SettingCard;
