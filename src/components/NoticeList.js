import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

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

const NoticeList = ({selectedSection}) => {
  const [items, setItems] = useState([]);
  const listRef = useRef(null);
  var noticeIdList;

  if(localStorage.getItem('noticeId') == null) {
     noticeIdList = {
      'FA1': [],
      'FA2': [],
      'FA34': [],
      'FA35': [],
      'SC1': []
    };
  } else {
    noticeIdList = JSON.parse(localStorage.getItem('noticeId'));
  }


  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
    if(sessionStorage.getItem(selectedSection) != null) {
      setItems(JSON.parse(sessionStorage.getItem(selectedSection)));
    } else {
      setItems([]);
      let url = 'https://www.iflab.run/api/notice/' + selectedSection;

      axios.get(url)
        .then(response => {
          setItems(response.data);
          sessionStorage.setItem(selectedSection, JSON.stringify(response.data));
        })
        .catch(error => {
          console.error('API 요청 중 오류 발생:');
        });
    }
  }, [selectedSection]);

  return (
    <NoticeListContainer ref={listRef}>
      {items.map((item, index) => (
        <NoticeItem key={index} data={item} />
      ))}
    </NoticeListContainer>
  );

  function clickNoticeItem(id) {
    if(noticeIdList[selectedSection].includes(id)) {
      return;
    }
    noticeIdList[selectedSection].push(id);
    localStorage.setItem('noticeId', JSON.stringify(noticeIdList));
  };

  function NoticeItem({ data }) {
    if (!data || typeof data !== 'object' || !data.title) {
      return null; // 렌더링하지 않음 또는 오류 처리
    }
    return (
      <NoticeItemContainer
        alreadyRead = {noticeIdList[selectedSection].includes(data.id)}
        onClick={() => clickNoticeItem(data.id)}
        href={data.link}>
        <NoticeTitle>{data.title}</NoticeTitle>
        <NoticeWrapper>
          <NoticeInfo>{data.writtenAt}</NoticeInfo>
          <NoticeInfo>{data.author}</NoticeInfo>
          <NoticeInfo>{data.views}회</NoticeInfo>
        </NoticeWrapper>
      </NoticeItemContainer>
    );
  }
};

export default React.memo(NoticeList);

const NoticeListContainer = styled.div`
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
`;

