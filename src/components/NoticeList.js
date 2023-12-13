import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import loadingIcon from '../images/loading-icon.svg';
import kebabIcon from '../images/kebab-icon.svg';
// import bookmarkIcon from '../images/gray-bookmark24-icon.svg';
import readCheckIcon from '../images/read-check-icon.svg';
import unreadCheckIcon from '../images/unread-check-icon.svg';
import MajorInputModal from './Modal/MajorInputModal';
import Button from './Buttons';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  } 
`;

const showListAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  } 
`;

const NoticeList = ({selectedSection, openViewer}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const listRef = useRef(null);
  var alreadyReadList;

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const loadMajorNoticeList = () => {
    // 학과공지 불러오기
    setIsLoading(true);
    setItems([]);

    // 학과 공지사항 불러오는 API
    let academicInfo = JSON.parse(localStorage.getItem('academicInfo'));
    let url = 'https://www.iflab.run/api/notice/major/' + academicInfo.major_id;
    axios.get(url)
      .then(response => {
        setItems(response.data);
        sessionStorage.setItem(selectedSection, JSON.stringify(response.data));
        setIsLoading(false);
      })
      .catch(error => {
        console.error('API 요청 중 오류 발생:');
      });
  };

  if(localStorage.getItem('noticeId') == null) {
     alreadyReadList = {
      'FA1': [],
      'FA2': [],
      'FA34': [],
      'DA1': [],
      'FA35': [],
      'SC1': []
    };
    localStorage.setItem('noticeId', JSON.stringify(alreadyReadList));
  } else {
    alreadyReadList = JSON.parse(localStorage.getItem('noticeId'));
  }

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
    if(selectedSection === 'DA1') {
      const noticeId = JSON.parse(localStorage.getItem('noticeId'));
      if(noticeId['DA1'] === undefined) {
        noticeId['DA1'] = [];
        localStorage.setItem('noticeId', JSON.stringify(noticeId));
      }

      // 학과공지가 선택된 경우
      // localStorage에 유저의 학과 정보가 있는지 확인 후
      // 학과 정보가 있으면 api실행하여 공지를 불러옴
      setIsLoading(true);
      if(localStorage.getItem('academicInfo') !== null) {
        let academicInfo = JSON.parse(localStorage.getItem('academicInfo'));
        if (sessionStorage.getItem(selectedSection) != null) {
          // sessionStorage에 선택된 섹션의 공지가 있는 경우
          setItems(JSON.parse(sessionStorage.getItem(selectedSection)));
          setIsLoading(false);
        } else {
          // sessionStorage에 선택된 섹션의 공지가 없는 경우
          setIsLoading(true);
          setItems([]);

          // 학과 공지사항 불러오는 API
          let url = 'https://www.iflab.run/api/notice/major/' + academicInfo.major_id;
          axios.get(url)
            .then(response => {
              setItems(response.data);
              sessionStorage.setItem(selectedSection, JSON.stringify(response.data));
            })
            .catch(error => {
              console.error('API 요청 중 오류 발생:');
            });
          
        }
      } else {
        setItems([]);
      }
      setIsLoading(false);
    }

    else if(selectedSection === 'BM') {
      // 북마크가 선택된 경우
      // localStorage에 북마크가 있는지 확인 후
      // 북마크가 있으면 불러옴
      // 없으면 빈 배열을 불러오고 localStorage에 빈 배열을 저장
      setIsLoading(true);
      if(localStorage.getItem('bookmark') !== null) {
        let bookmark = JSON.parse(localStorage.getItem('bookmark'));
        bookmark = bookmark.sort((a, b) => {
          const aDate = new Date(a.writtenAt);
          const bDate = new Date(b.writtenAt);
          return bDate - aDate;
        });
        setItems(bookmark);
      } else {
        localStorage.setItem('bookmark', JSON.stringify([]));
        setItems([]);
      }
      setIsLoading(false);
    }

    else if(sessionStorage.getItem(selectedSection) != null) {
      // sessionStorage에 선택된 섹션의 공지가 있는 경우
      setItems(JSON.parse(sessionStorage.getItem(selectedSection)));
      setIsLoading(false);
    } else {
      // sessionStorage에 선택된 섹션의 공지가 없는 경우
      setIsLoading(true);
      setItems([]);

      // 공지사항 불러오는 API
      let url = 'https://www.iflab.run/api/notices/' + selectedSection;

      axios.get(url)
        .then(response => {
          setItems(response.data);
          sessionStorage.setItem(selectedSection, JSON.stringify(response.data));
          setIsLoading(false);
        })
        .catch(error => {
          console.error('API 요청 중 오류 발생:');
        });
    }
  }, [selectedSection]);

  return (
    <>
      <NoticeListContainer ref={listRef}>
        {isLoading ? (
          <LoadingIcon src={loadingIcon} />
        ) : (items.length === 0 && selectedSection === 'BM') ? (
          <NoItemContainer key={selectedSection}>
            <NoItemText>북마크 된 공지사항이 없어요.</NoItemText>
            </NoItemContainer>
        ) : (items.length === 0 && selectedSection === 'DA1') ? (
          <NoItemContainer key={selectedSection}>
            <NoItemText>학과를 선택하고 공지사항을 받아보세요!</NoItemText>
            <Button color={"blue"} size={"small"} onClick={openModal}>
              학과 선택하기
            </Button>
          </NoItemContainer>
        ) : (
          items.map((item, index) => (
            <NoticeItem key={index} data={item} />
          ))
        )}
      </NoticeListContainer>
      <MajorInputModal isModalOpen={isModalOpen} closeModal={closeModal} handleConfirm={loadMajorNoticeList}/>
    </>
  );

  function sendNoticeInfo(id, section, link) {
    if(selectedSection === 'DA1') {
      const academicInfo = JSON.parse(localStorage.getItem('academicInfo'));
      openViewer(id, academicInfo.college_id, link);
    } else {
      openViewer(id, section, link);
    }
    // 북마크는 예외
    if (selectedSection === 'BM') {
      return;
    }
    // 이미 읽은 공지면 return
    // 그렇지 않으면 localStorage에 저장
    if(alreadyReadList[selectedSection].includes(id)) {
      return;
    }
    alreadyReadList[selectedSection].push(id);
    localStorage.setItem('noticeId', JSON.stringify(alreadyReadList));
  };

  function NoticeItem({ data }) {
    const [alreadyRead, setAlreadyRead] = useState(false);
    const [isClickedOption, setIsClickedOption] = useState(false);
    useEffect(() => {
      if (selectedSection !== 'BM') {
        setAlreadyRead(alreadyReadList[selectedSection]?.includes(data.id));
      }
    }, [data.id]);

    if (!data || typeof data !== 'object' || !data.title) {
      return null; // 렌더링하지 않음 또는 오류 처리
    }

    function clickNoticeItem(id, section, link) {
      sendNoticeInfo(id, section, link);
      setAlreadyRead(true);
    };

    function clickOptionButton(e) {
      setIsClickedOption(!isClickedOption);
      e.stopPropagation();
    };

    // option Item 눌렀을 때
    function clickOptionItem(e, option, id) {
      e.stopPropagation();
      setIsClickedOption(false);

      setTimeout(() => {
        if (option === 'read') {
          setAlreadyRead(true);
          if(alreadyReadList[selectedSection].includes(id)) {
            return;
          }
          alreadyReadList[selectedSection].push(id);
          localStorage.setItem('noticeId', JSON.stringify(alreadyReadList));
        }
        else if (option === 'unread') {
          setAlreadyRead(false);
          alreadyReadList[selectedSection] = alreadyReadList[selectedSection].filter((item) => item !== id);
          localStorage.setItem('noticeId', JSON.stringify(alreadyReadList));
        }
      }, 100);
    }

    return (
      <NoticeItemContainer
        onClick={() => selectedSection !== 'BM' ? clickNoticeItem(data.id, selectedSection, data.link) : clickNoticeItem(data.id, data.section, data.link)}
        showOption={isClickedOption}
        onMouseLeave={() => setIsClickedOption(false)}
      >
        <NoticeWrapper
          alreadyRead={alreadyRead}
          showOption={isClickedOption}
        >
          <NoticeTitle>{data.title}</NoticeTitle>
          <NoticeInfoWrapper>
            {selectedSection === 'BM' ? (
              <NoticeInfo blue="true">
                {data.section === 'FA1' ? '일반공지' :
                data.section === 'FA2' ? '학사공지' :
                data.section === 'FA35' ? '창업공지' :
                data.section === 'SC1' ? '장학공지' :
                data.section === 'FA34' ? '직원채용' :
                '힉과공지'}
              </NoticeInfo>
            ) : null}
            <NoticeInfo>{data.author}</NoticeInfo>
            <NoticeInfo>{data.writtenAt}</NoticeInfo>
            <NoticeInfo>{selectedSection !== 'BM' ? `${data.views}회` : null}</NoticeInfo>
          </NoticeInfoWrapper>
        </NoticeWrapper>
        <NoticeOptionButton onClick={clickOptionButton} src={kebabIcon} />
        <NoticeOptionWrapper isClicked={isClickedOption}>
          {alreadyRead ? (
            <NoticeOptionItem onClick={(event) => clickOptionItem(event, 'unread', data.id)}>
              <NoticeOptionText>읽지 않음으로 표시</NoticeOptionText>
              <NoticeOptionIcon src={unreadCheckIcon} />
            </NoticeOptionItem>
          ) : (
            <NoticeOptionItem onClick={(event) => clickOptionItem(event, 'read', data.id)}>
              <NoticeOptionText>읽음으로 표시</NoticeOptionText>
              <NoticeOptionIcon src={readCheckIcon} />
            </NoticeOptionItem>
          )}
        </NoticeOptionWrapper>
      </NoticeItemContainer>
    );
  }
};

export default React.memo(NoticeList, (prevProps, nextProps) => {
    return prevProps.selectedSection === nextProps.selectedSection;
});

const NoticeListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 70vh;
  background-color: ${props => props.theme.foreground}f4;
  border-radius: 8px;
  overflow-y: scroll;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
`;

const NoticeItemContainer = styled.div`
  position: relative;
  animation: ${showListAnimation} 0.5s ease-in-out forwards;
  opacity: 0;

  display: flex;
  flex-direction: column;

  padding: 16px 20px;
  border-bottom: 1px solid #00000010;

  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${props => props.theme.foreground};
    filter: ${props => props.showOption ? 'brightness(1)' : 'brightness(0.9)'};
  }
  &:active {
    filter: ${props => props.showOption ? 'brightness(1)' : 'brightness(0.8)'};
  }
`;

const NoticeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${props => props.alreadyRead && css`
    filter: opacity(0.5);
    &:hover {
      filter: opacity(0.5) brightness(0.9);
    }
    &:active {
      filter: opacity(0.5) brightness(0.8);
    }
  `}
`;

const NoticeTitle = styled.span`
  color: ${props => props.theme.contentText};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
`;

const NoticeInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const NoticeInfo = styled.span`
  color: ${props => props.theme.contentText};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -1px;

  &:last-child {
    flex-grow: 1;
    text-align: right;
  }

  ${props => props.blue && css`
    color: ${props => props.theme.primary};
  `}
  
`;

const NoItemContainer = styled.div`
  animation: ${showListAnimation} 0.5s ease-in-out forwards;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const NoItemText = styled.span`
  width: max-content;

  color: ${props => props.theme.contentText};
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -3px;
  text-align: center;
`;

const LoadingIcon = styled.img`
  animation: ${rotateAnimation} 4s cubic-bezier(.25,.51,.43,.7) infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 48px;
  height: 48px;
`

const NoticeOptionButton = styled.img`
  position: absolute;
  top: 12px;
  right: 8px;
  width: 24px;
  height: 24px;
  opacity: 0;
  ${NoticeItemContainer}:hover & {
    opacity: 1;
  }
`

const NoticeOptionWrapper = styled.div`
  position: absolute;
  top: 36px;
  right: 20px;
  display: flex;
  flex-direction: column;
  background-color: #3c414c;
  border-radius: 4px;

  overflow: hidden;
  user-select: none;

  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
  transform-origin: top right;
  transition-duration: 0.1s;

  ${NoticeItemContainer}:hover & {
    transition-duration: ${props => props.isClicked ? '0.2s' : '0.1s'};
    opacity: ${props => props.isClicked ? '1' : '0'};
    transform: ${props => props.isClicked ? 'scale(1)' : 'scale(0.8)'};
    pointer-events: ${props => props.isClicked ? 'auto' : 'none'};
  }
`

const NoticeOptionItem = styled.div`
  min-width: 144px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ffffff1a;
  background-color: #3c414c;

  padding: 8px;
  &:last-child {
    border-bottom: none;
  }

  &:hover { filter: brightness(1.1); }
  &:active {
    transition-duration: 0.1s;
    filter: brightness(1.2);
  }
`

const NoticeOptionText = styled.span`
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -1px;
`

const NoticeOptionIcon = styled.img`
  width: 16px;
  height: 16px;
`
