import './App.css';
import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, ThemeContext } from 'styled-components';
import logo from './images/logo.svg';
//import libraryIcon from './images/library-icon.svg';
//import mapIcon from './images/map-icon.svg';
import noticeFA1Icon from './images/notice-FA1-icon.svg';
import noticeFA2Icon from './images/notice-FA2-icon.svg';
import noticeFA35Icon from './images/notice-FA35-icon.svg';
import noticeSC1Icon from './images/notice-SC1-icon.svg';
import noticeFA34Icon from './images/notice-FA34-icon.svg';
import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import SelectedSection from './components/SelectedSection';
import NoticeList from './components/NoticeList';
import BlackScreen from './components/BlackScreen';
import InputModal from './components/InputModal';
import GroundBackground from './components/GroundBackground';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const ContentContainer = styled.div`
  display: grid;
  grid-template-rows: 40px 1fr;
  grid-template-columns: 160px 1fr;

  width: 100%;
  max-width: 1080px;
  margin: 40px auto 0 auto;
  gap: 16px 24px;
`;

const ContentTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MoveLink = styled.a`
  color: ${(props) => props.theme.subText};
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
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedSection, setSelectedSection] = useState('FA1');
  const [selectedSectionIcon, setSelectedSectionIcon] = useState(noticeFA1Icon);
  const [selectedSectionName, setSelectedSectionName] = useState('일반공지');
  const [selectedSectionLink, setSelectedSectionLink] = useState('https://www.uos.ac.kr/korNotice/list.do?list_id=FA1');
  const [isSideBarOpen, setIsSideBarOpen] = useState(localStorage.getItem('isSideBarOpen') === 'true' ? true : false);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  
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

  const openInputModal = () => {
    setIsInputModalOpen(true);
  };

  const closeInputModal = () => {
    setIsInputModalOpen(false);
  };

  return (
    <ThemeProvider theme={themeObject[theme]}>
      <div className="App">
        <GroundBackground />
        <TopBar
          theme={theme}
          isSideBarOpen={isSideBarOpen}
          toggleTheme={toggleTheme}
          toggleSideBar={toggleSideBar}
          />
        {
        isOnline ? (
          <ContentContainer>
            <div className="dummy" />
            <ContentTop>
              <SelectedSection
                selectedSectionIcon={selectedSectionIcon}
                selectedSectionName={selectedSectionName}
              />
              <MoveLink href={selectedSectionLink}>사이트 이동</MoveLink>
            </ContentTop>
            <div>
              <NavBar
                onSectionClick={selectSection}
                selectedSection={selectedSection}
              />
            </div>
            <NoticeList
              selectedSection={selectedSection}
            />
          </ContentContainer>
        ) : (
          <Offline>
            <FontAwesomeIcon icon={faTriangleExclamation} size="4x" bounce style={{color: "#ffb800",}} />
            <OfflineText>인터넷이 연결되어 있지 않아요.</OfflineText>
          </Offline>
        )}
        <SideBar isSideBarOpen={isSideBarOpen} openInputModal={openInputModal} />
      </div>
      <BlackScreen isOpen={isInputModalOpen}/>
      <InputModal
        isInputModalOpen={isInputModalOpen}
        closeInputModal={closeInputModal}
      />
    </ThemeProvider>
  );
};

export default App;
