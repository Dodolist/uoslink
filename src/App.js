import './App.css';
import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
//import libraryIcon from './images/library-icon.svg';
//import mapIcon from './images/map-icon.svg';
import bookmarkIcon from './images/bookmark-icon.svg';
import noticeFA1Icon from './images/notice-FA1-icon.svg';
import noticeFA2Icon from './images/notice-FA2-icon.svg';
import noticeFA35Icon from './images/notice-FA35-icon.svg';
import noticeDA1Icon from './images/notice-DA1-icon.svg';
import noticeSC1Icon from './images/notice-SC1-icon.svg';
import noticeFA34Icon from './images/notice-FA34-icon.svg';
import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import SelectedSection from './components/SelectedSection';
import NoticeList from './components/NoticeList';
import ArticleList from './components/ArticleList';
import GroundBackground from './components/GroundBackground';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import SnowPage from './components/SnowPage';

import Viewer from './components/Viewer';

const ContentContainer = styled.div`
  display: grid;
  grid-template-rows: 40px 1fr;
  grid-template-columns: 140px 1fr 280px;

  width: 100%;
  max-width: 1280px;
  margin: 40px auto 0 auto;
  gap: 16px 24px;
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
    id: 'BM',
    icon: bookmarkIcon,
    name: '내 북마크'
  },
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
    id: 'DA1',
    icon: noticeDA1Icon,
    name: '학과공지',
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

const List = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 24px;
`

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedSection, setSelectedSection] = useState('FA1');
  const [selectedNoticeId, setSelectedNoticeId] = useState('');
  const [selectedNoticeSection, setSelectedNoticeSection] = useState('');
  const [selectedNoticeLink, setSelectedNoticeLink] = useState('');
  const [selectedSectionIcon, setSelectedSectionIcon] = useState(noticeFA1Icon);
  const [selectedSectionName, setSelectedSectionName] = useState('일반공지');
  const [isSideBarOpen, setIsSideBarOpen] = useState(localStorage.getItem('isSideBarOpen') === 'true' ? true : false);
  const [activeSnow, setActiveSnow] = useState(localStorage.getItem('activeSnow') === 'true' ? true : false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  const themeObject = {
    light: {
      mode: 'light',
      background: '#e5e6ec',
      foreground: '#f0f1f5',
      titleText: '#3c414c',
      contentText: '#5c5e66',
      subText: '#a9adb9',
      primary: '#408cff',
      secondary: '#98bffa',
      boxShadow: '0 4px 24px 0 #cecece',
    },
    dark: {
      mode: 'dark',
      background: '#1d2128',
      foreground: '#2c3038',
      titleText: '#a0a4b3',
      contentText: '#b4b7c4',
      subText: '#5d616f',
      primary: '#408cff',
      secondary: '#98bffa',
      boxShadow: '0 4px 24px 0 #3c414c',
    }
  };

  const selectSection = (id) => {
    setSelectedSection(id);
    
    for(let i = 0; i < SectionList.length; i++) {
      if(SectionList[i].id === id) {
        setSelectedSectionIcon(SectionList[i].icon);
        setSelectedSectionName(SectionList[i].name);
      }
    }
  };

  useEffect(() => {
    if(!localStorage.getItem('isSideBarOpen')) {
      localStorage.setItem('isSideBarOpen', 'true');
    } else {
      setIsSideBarOpen(localStorage.getItem('isSideBarOpen') === 'true');
    }
  }, []);

  useEffect(() => {
    if(!localStorage.getItem('activeSnow')) {
      localStorage.setItem('activeSnow', 'true');
    } else {
      setActiveSnow(localStorage.getItem('activeSnow') === 'true');
    }
  }, []);

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
  
  const toggleTheme = () => {
    /*
    chrome.history.search({text: '', maxResults: 20}, function(data) {
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].url);
      }
    });
    */
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleSideBar = () => {
    if (isSideBarOpen) {
      setIsSideBarOpen(false);
      localStorage.setItem('isSideBarOpen', false);
    } else {
      setIsSideBarOpen(true);
      localStorage.setItem('isSideBarOpen', true);
    }
  };

  const toggleSnow = () => {
    if (activeSnow) {
      setActiveSnow(false);
      localStorage.setItem('activeSnow', false);
    } else {
      setActiveSnow(true);
      localStorage.setItem('activeSnow', true);
    }
  };

  const openViewer = (id, section, link) => {
    setSelectedNoticeId(id);
    setSelectedNoticeSection(section);
    setSelectedNoticeLink(link);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setTimeout(() => {
      setSelectedNoticeId('');
      setSelectedNoticeSection('');
      setSelectedNoticeLink('');
    }, 200);
    setIsViewerOpen(false);
  };

  return (
    <ThemeProvider theme={themeObject[theme]}>
      <div className="App">
        <GroundBackground />
        <TopBar
          theme={theme}
          isSideBarOpen={isSideBarOpen}
          activeSnow={activeSnow}
          toggleTheme={toggleTheme}
          toggleSideBar={toggleSideBar}
          toggleSnow={toggleSnow}
        />
        {
        isOnline ? (
          <ContentContainer>
            <div className="dummy" />
            <SelectedSection
              selectedSectionIcon={selectedSectionIcon}
              selectedSectionName={selectedSectionName}
            />
            <div className="dummy" />
            <div>
              <NavBar
                onSectionClick={selectSection}
                selectedSection={selectedSection}
              />
            </div>
            <NoticeList
              openViewer={openViewer}
              selectedSection={selectedSection}
            />
            <List>
              <ArticleList
                openViewer={openViewer}
              />
            </List>
          </ContentContainer>
        ) : (
          <Offline>
            <FontAwesomeIcon icon={faTriangleExclamation} size="4x" bounce style={{color: "#ffb800",}} />
            <OfflineText>인터넷이 연결되어 있지 않아요.</OfflineText>
          </Offline>
        )}
        <SideBar
          isSideBarOpen={isSideBarOpen}
        />
      </div>
      <Viewer
        isViewerOpen={isViewerOpen}
        selectedNoticeId={selectedNoticeId}
        selectedNoticeSection={selectedNoticeSection}
        selectedNoticeLink={selectedNoticeLink}
        closeViewer={closeViewer}
      />
      <SnowPage
        activeSnow={activeSnow}
      />
    </ThemeProvider>
  );
};

export default App;
