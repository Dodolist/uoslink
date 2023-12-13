/* global chrome */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import tailIcon from '../images/tail-icon.svg';
import serviceNoticeIcon from '../images/service-notice-icon.svg';

const ServiceNoticeWrap = styled('div')`
  position: absolute;
  width: max-content;
  z-index: 100;
  left: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  transform-origin: center left;
  padding: 8px 12px 8px 8px;
  margin-left: 8px;
  background-color: #373737;
  border-radius: 4px;
  gap: 4px;
  
  cursor: pointer;
  user-select: none;

  transition: opacity 2s ease-in-out, transform 2s ease-in-out;
  opacity: ${(props) => props.isShow ? 1 : 0};
  transform: ${(props) => props.isShow ? 'scaleX(1)' : 'scaleX(0)'};
`

const TailIconWrap = styled('img')`
  position: absolute;
  top: 50%; 
  right: calc(100% - 2px);
  transform: translateY(-50%);
  width: 7px;
  height: 12px;
`

const ServiceNoticeText = styled('span')`
  color: #ffffff;
  font-size: 12px;
  letter-spacing: -1px;

  transition: ${(props) => props.isShow ? 'opacity 1s 2s ease-in-out' : 'opacity 1s ease-in-out'};
  opacity: ${(props) => props.isShow ? 1 : 0};

  ${(props) => props.type === 'blue' && css`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #408cff;
    font-weight: bold;
  `}
`

const ServiceNotice = () => {
  const [isShow, setIsShow] = useState(false);
  const [serviceNotice, setServiceNotice] = useState('');

  useEffect(() => {
    let url;
    try {
      url = 'https://www.iflab.run/api/check/version/' + chrome.runtime.getManifest().version;
    } catch(error) {
      url = 'https://www.iflab.run/api/check/version/0.9.3';
    }
    setTimeout(() => {
      axios.get(url)
        .then((response) => {
          if(response.status === 200) {
              setIsShow(false);
          } else {
            setIsShow(true);
            setTimeout(() => {
              setIsShow(false);
            }, 10000);
          }
        })
        .catch((error) => {
          if(error.response.status === 300) {
            setServiceNotice(error.response.data);
            setIsShow(true);
            setTimeout(() => {
              setIsShow(false);
            }, 10000);
          } else if(error.response.status) {
            setIsShow(true);
            setTimeout(() => {
              setIsShow(false);
            }, 10000);
          }
        });
    }, 3000);
  }, []);

  function clickServiceNotice() {
    setTimeout(() => {
      setIsShow(false);
    }, 200);
  };

  return(
    <ServiceNoticeWrap isShow={isShow} onClick={clickServiceNotice}>
      <TailIconWrap src={tailIcon} />
      <ServiceNoticeText type="blue" isShow={isShow}>
        <img src={serviceNoticeIcon} />
        공지
      </ServiceNoticeText>
      <ServiceNoticeText isShow={isShow}>
        { serviceNotice ? serviceNotice : (<div><b>새로운 버전</b>이 업데이트 되었어요! 크롬을 재시작 하면 업데이트 됩니다.</div>)}
      </ServiceNoticeText>
    </ServiceNoticeWrap>
  );
};

export default ServiceNotice;
