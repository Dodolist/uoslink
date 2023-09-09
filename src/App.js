import './App.css';
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

const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  border-radius: 8px;
  gap: 16px;
  background-color: #f0f1f5;
  min-width: 160px;
  flex-shrink: 0;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  opacity: 0.5;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
  &:first-child {
    opacity: 1;
  }
`;

const SectionIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SectionName = styled.span`
  color: #5c5e66;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
`;

const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 0 0;
  background-color: #f0f1f5;
  flex-grow: 1;
  border-radius: 8px;
  overflow: hidden;
`;

const NoticeItem = styled.div`
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;

  background-color: #f0f1f5;
  padding: 16px 20px;
  border-bottom: 1px solid #00000010;
  gap: 4px;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
`;

const NoticeTitle = styled.span`
  color: #5c5e66;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
`;

const NoticeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const NoticeInfo = styled.span`
  color: #5c5e66;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -1px;
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
        <NavBar>
          <Section>
            <SectionIcon src={noticeFA1Icon} />
            <SectionName>일반공지</SectionName>
          </Section>
          <Section>
            <SectionIcon src={noticeFA2Icon} />
            <SectionName>학사공지</SectionName>
          </Section>
          <Section>
            <SectionIcon src={noticeFA35Icon} />
            <SectionName>창업공지</SectionName>
          </Section>
          <Section>
            <SectionIcon src={noticeSC1Icon} />
            <SectionName>장학공지</SectionName>
          </Section>
          <Section>
            <SectionIcon src={noticeFA34Icon} />
            <SectionName>직원채용</SectionName>
          </Section>
        </NavBar>
        <NoticeList>
          <NoticeItem>
            <NoticeTitle>2021학년도 1학기 장학금 신청 안내</NoticeTitle>
            <NoticeWrapper>
              <NoticeInfo>2021.03.01</NoticeInfo>
              <NoticeInfo>학생지원처</NoticeInfo>
            </NoticeWrapper>
          </NoticeItem>
          <NoticeItem>
            <NoticeTitle>2021학년도 1학기 장학금 신청 안내</NoticeTitle>
            <NoticeWrapper>
              <NoticeInfo>2021.03.01</NoticeInfo>
              <NoticeInfo>학생지원처</NoticeInfo>
            </NoticeWrapper>
          </NoticeItem>
          <NoticeItem>
            <NoticeTitle>2021학년도 1학기 장학금 신청 안내</NoticeTitle>
            <NoticeWrapper>
              <NoticeInfo>2021.03.01</NoticeInfo>
              <NoticeInfo>학생지원처</NoticeInfo>
            </NoticeWrapper>
          </NoticeItem>
          <NoticeItem>
            <NoticeTitle>2021학년도 1학기 장학금 신청 안내</NoticeTitle>
            <NoticeWrapper>
              <NoticeInfo>2021.03.01</NoticeInfo>
              <NoticeInfo>학생지원처</NoticeInfo>
            </NoticeWrapper>
          </NoticeItem>
          <NoticeItem>
            <NoticeTitle>2021학년도 1학기 장학금 신청 안내</NoticeTitle>
            <NoticeWrapper>
              <NoticeInfo>2021.03.01</NoticeInfo>
              <NoticeInfo>학생지원처</NoticeInfo>
            </NoticeWrapper>
          </NoticeItem>
        </NoticeList>
      </div>
    </div>
  );
}

export default App;
