import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import loadingIcon from '../images/loading-icon.svg';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  } 
`;

const showNoticeAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  } 
`;

const NoticeList = ({isNoticeViewerOpen, selectedSection, openNoticeViewer}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef(null);
  var alreadyReadList;

  if(localStorage.getItem('noticeId') == null) {
     alreadyReadList = {
      'FA1': [],
      'FA2': [],
      'FA34': [],
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
    if(selectedSection === 'BM') {
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
      setItems(JSON.parse(sessionStorage.getItem(selectedSection)));
    } else {
      setIsLoading(true);
      setItems([]);
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
    <NoticeListContainer ref={listRef}>

      {isLoading ? (
        <LoadingIcon src={loadingIcon} />
      ) : (items.length === 0 && selectedSection === 'BM') ? (
        <NoItemText>북마크 된 공지사항이 없어요.</NoItemText>
      ) : (
        items.map((item, index) => (
          <NoticeItem key={index} data={item} />
        ))
      )}
    </NoticeListContainer>
  );

  function sendNoticeInfo(id, section, link) {
    openNoticeViewer(id, section, link);
    // 이미 읽은 공지면 return
    // 그렇지 않으면 localStorage에 저장
    if (selectedSection === 'BM') {
      return;
    }
    if(alreadyReadList[selectedSection].includes(id)) {
      return;
    }
    alreadyReadList[selectedSection].push(id);
    localStorage.setItem('noticeId', JSON.stringify(alreadyReadList));
  };

  function NoticeItem({ data }) {
    const [alreadyRead, setAlreadyRead] = useState(false);
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

    return (
      <NoticeItemContainer
        alreadyRead={alreadyRead}
        onClick={() => selectedSection !== 'BM' ? clickNoticeItem(data.id, selectedSection, data.link) : clickNoticeItem(data.id, data.section, data.link)}
      >
        <NoticeTitle>{data.title}</NoticeTitle>
        <NoticeWrapper>
          {selectedSection === 'BM' ? (
            <NoticeInfo blue="true">
              {data.section === 'FA1' ? '일반공지' :
              data.section === 'FA2' ? '학사공지' :
              data.section === 'FA35' ? '창업공지' :
              data.section === 'SC1' ? '장학공지' :
              data.section === 'FA34' ? '직원채용' :
              ''}
            </NoticeInfo>
          ) : null}
          <NoticeInfo>{data.author}</NoticeInfo>
          <NoticeInfo>{data.writtenAt}</NoticeInfo>
          <NoticeInfo>{selectedSection !== 'BM' ? `${data.views}회` : null}</NoticeInfo>
        </NoticeWrapper>
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
  height: 75vh;
  background-color: ${props => props.theme.foreground};
  border-radius: 8px;
  overflow-y: scroll;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }

`;

const NoticeItemContainer = styled.a`
  animation: ${showNoticeAnimation} 0.5s ease-in-out forwards;
  opacity: 0;

  transition: all 0.3s;
  display: flex;
  flex-direction: column;

  background-color: ${props => props.theme.foreground};
  padding: 16px 20px;
  border-bottom: 1px solid #00000010;
  gap: 4px;

  cursor: pointer;
  text-decoration: none;

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }

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

const NoticeWrapper = styled.div`
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

const NoItemText = styled.span`
  animation: ${showNoticeAnimation} 0.5s ease-in-out forwards;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;

  color: ${props => props.theme.contentText};
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -3px;
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
