import './App.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import logo from './images/logo.svg';
import foodIcon from './images/food-icon.svg';
import libraryIcon from './images/library-icon.svg';
import mapIcon from './images/map-icon.svg';
import settingIcon from './images/setting-icon.svg';
import noticeFA1Icon from './images/notice-FA1-icon.svg';
import noticeFA2Icon from './images/notice-FA2-icon.svg';
import noticeFA35Icon from './images/notice-FA35-icon.svg';
import noticeSC1Icon from './images/notice-SC1-icon.svg';
import noticeFA34Icon from './images/notice-FA34-icon.svg';
import NavBar from './components/NavBar';
import NoticeList from './components/NoticeList';

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

const MoveLink = styled.a`
  color: #a0a0a0;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -1px;
  cursor: pointer;
  text-decoration: underline;
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
  const [selectedSection, setSelectedSection] = useState('FA1');
  const [selectedSectionIcon, setSelectedSectionIcon] = useState(noticeFA1Icon);
  const [selectedSectionName, setSelectedSectionName] = useState('일반공지');
  const [selectedSectionLink, setSelectedSectionLink] = useState('https://www.uos.ac.kr/korNotice/list.do?list_id=FA1');

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

  return (
    <div className="App">
      <div className="App-Topbar">
        <div className="left-wrap">
          <img className="logo" src={logo} alt="logo" />
          <span className="title">한 눈에 확인하는 서울시립대</span>
        </div>
        <div className="right-wrap">
          <img className="icon" src={foodIcon} />
          <img className="icon" src={libraryIcon} />
          <img className="icon" src={mapIcon} />
          <img className="icon" src={settingIcon} />
        </div>
      </div>
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
    </div>
  );
};

export default App;
