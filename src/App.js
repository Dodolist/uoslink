import './App.css';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from './images/logo.svg';
import foodIcon from './images/food-icon.svg';
//import libraryIcon from './images/library-icon.svg';
//import mapIcon from './images/map-icon.svg';
import settingIcon from './images/setting-icon.svg';
import noticeFA1Icon from './images/notice-FA1-icon.svg';
import noticeFA2Icon from './images/notice-FA2-icon.svg';
import noticeFA35Icon from './images/notice-FA35-icon.svg';
import noticeSC1Icon from './images/notice-SC1-icon.svg';
import noticeFA34Icon from './images/notice-FA34-icon.svg';
import NavBar from './components/NavBar';
import FoodCard from './components/FoodCard/index.js';
import NoticeList from './components/NoticeList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const SelectedSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SelectedSectionIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const SelectedSectionName = styled.span`
  color: #3c414c;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -2px;
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
`

const MoveLink = styled.a`
  color: #a0a0a0;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -1px;
  cursor: pointer;
  text-decoration: underline;
`;

const Offline = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 64px;
  border-radius: 16px;
  background-color: #ffdb7c;
`

const OfflineText = styled.span`
  color: #00000080;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -2px;
`;

const SectionList = [
  {
    id: 'FA1',
    icon: noticeFA1Icon,
    name: '일반공지',
    link: 'https://www.uos.ac.kr/korNotice/list.do?list_id=FA1'
  },
  {
    id: 'FA2',
    icon: noticeFA2Icon,
    name: '학사공지',
  },
  {
    id: 'FA35',
    icon: noticeFA35Icon,
    name: '창업공지',
  },
  {
    id: 'SC1',
    icon: noticeSC1Icon,
    name: '장학공지',
  },
  {
    id: 'FA34',
    icon: noticeFA34Icon,
    name: '직원채용',
  },
];

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedSection, setSelectedSection] = useState('FA1');
  const [selectedSectionIcon, setSelectedSectionIcon] = useState(noticeFA1Icon);
  const [selectedSectionName, setSelectedSectionName] = useState('일반공지');
  const [selectedSectionLink, setSelectedSectionLink] = useState('https://www.uos.ac.kr/korNotice/list.do?list_id=FA1');
  const [isOpenedFoodCard, setIsOpenedFoodCard] = useState(false);
  const [selectedFoodTime, setSelectedFoodTime] = useState('breakfast');
  const [selectedFoodPlace, setSelectedFoodPlace] = useState('020');

  const selectSection = (id) => {
    setSelectedSection(id);

    for(let i = 0; i < SectionList.length; i++) {
      if(SectionList[i].id === id) {
        setSelectedSectionIcon(SectionList[i].icon);
        setSelectedSectionName(SectionList[i].name);
        if(id == 'SC1') {
          setSelectedSectionLink('https://scholarship.uos.ac.kr/scholarship/notice/notice/list.do?brdBbsseq=1');
        } else {
          setSelectedSectionLink('https://www.uos.ac.kr/korNotice/list.do?list_id=' + SectionList[i].id);
        }
      }
    }
  };

  useEffect(() => {
    // 온라인 및 오프라인 상태 변경 이벤트 핸들러 등록
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 핸들러 제거
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  const handleOnlineStatusChange = () => {
    setIsOnline(navigator.onLine);
  };
  
  const handleOpenCard = (card) => () => {
    if(card === 'food') {
      setIsOpenedFoodCard(!isOpenedFoodCard);
    }
  };

  return (
    <div className="App">
      <div className="App-Topbar">
        <div className="left-wrap">
          <img className="logo" src={logo} alt="logo" />
          <span className="title">시대링크</span>
        </div>
        <div className="right-wrap">
          <CardWrapper>
            <FoodCard
              isShow={isOpenedFoodCard}
              onFoodTimeClick = {setSelectedFoodTime}
              onFoodPlaceClick = {setSelectedFoodPlace}
              selectedFoodTime = {selectedFoodTime}
              selectedFoodPlace = {selectedFoodPlace}
            />
            <img className="icon" onClick={handleOpenCard('food')} src={foodIcon} />
          </CardWrapper>
          <img className="icon" src={settingIcon} />
        </div>
      </div>
      {
      isOnline ? (
        <div className="App-Content">
          <div className="dummy" />
          <div className="App-Content-Top">
            <SelectedSection>
              <SelectedSectionIcon src={selectedSectionIcon} />
              <SelectedSectionName>{selectedSectionName}</SelectedSectionName>
            </SelectedSection>
            <MoveLink href={selectedSectionLink}>사이트 이동</MoveLink>
          </div>
          <div>
            <NavBar
              onSectionClick={selectSection}
              selectedSection={selectedSection}
            />
          </div>
          <NoticeList
            selectedSection={selectedSection}
          />
        </div>
      ) : (
        <Offline>
          <FontAwesomeIcon icon={faTriangleExclamation} size="4x" bounce style={{color: "#ffb800",}} />
          <OfflineText>인터넷이 연결되어 있지 않아요.</OfflineText>
        </Offline>
      )}
    </div>
  );
};

export default App;
