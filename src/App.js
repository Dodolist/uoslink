import './App.css';
import styled from 'styled-components';
import logo from './images/logo.svg';
import foodIcon from './images/food-icon.svg';
import libraryIcon from './images/library-icon.svg';
import mapIcon from './images/map-icon.svg';
import settingIcon from './images/setting-icon.svg';
import noticeFA1Icon from './images/notice-FA1-icon.svg';
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

const MoveLink = styled.u`
  color: #a0a0a0;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -1px;
  cursor: pointer;
`;

function App() {
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
            <SelectedSectionIcon src={noticeFA1Icon} />
            <SelectedSectionName>일반공지</SelectedSectionName>
          </SelectedSection>
          <MoveLink>사이트 이동</MoveLink>
        </div>
        <div>
          <NavBar>
          </NavBar>
        </div>
        <NoticeList>
        </NoticeList>
      </div>
    </div>
  );
}

export default App;
