import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loadingIcon from '../../images/loading-icon.svg';
import styled, { css, keyframes } from 'styled-components';

const SectionList = [
  {
    id: 'FA1',
    name: '일반공지',
  },
  {
    id: 'FA2',
    name: '학사공지',
  },
  {
    id: 'FA35',
    name: '창업공지',
  },
  {
    id: 'SC1',
    name: '장학공지',
  },
  {
    id: 'FA34',
    name: '직원채용',
  },
];

const ArticleList = ({openViewer}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    let url = 'https://www.iflab.run/api/notice/ranking';
    setIsLoading(true);
    axios.get(url)
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('API 요청 중 오류 발생:');
      });
  }, []);

  return (
    <ArticleListContainer>
      {isLoading ? (
        <LoadingIcon src={loadingIcon} />
      ) : (
        <>
          <ListName>Top 5 공지사항</ListName>
          {items.map((item, index) => (
            <ArticleItem key={index} data={item} rank={index+1} />
          ))}
        </>
      )}
    </ArticleListContainer>
  );

  function sendArticleInfo(id, section, link) {
    openViewer(id, section, link);
    // 이미 읽은 공지면 return
    // 그렇지 않으면 localStorage에 저장
    if(alreadyReadList[section].includes(id)) {
      return;
    }
    alreadyReadList[section].push(id);
    localStorage.setItem('noticeId', JSON.stringify(alreadyReadList));
  };

  function ArticleItem({ data, rank }) {
    const [alreadyRead, setAlreadyRead] = useState(false);
    const [sectionName, setSectionName] = useState('');

    useEffect(() => {
      setAlreadyRead(alreadyReadList[data.section]?.includes(data.id));
    }, [data.id]);

    useEffect(() => {
      for(let i = 0; i < SectionList.length; i++) {
        if(SectionList[i].id === data.section) {
          setSectionName(SectionList[i].name);
        }
      }
    }, []);

    if (!data || typeof data !== 'object' || !data.title) {
      return null; // 렌더링하지 않음 또는 오류 처리
    }

    function clickArticleItem(id, section, link) {
      sendArticleInfo(id, section, link);
      setAlreadyRead(true);
    };

    return (
      <ArticleItemContainer onClick={() => clickArticleItem(data.id, data.section, data.link)}>
        <ArticleWrapper>
          <ArticleRank>{rank}</ArticleRank>
          <ArticleInfoWrapper>
            <ArticleInfo>{sectionName}</ArticleInfo>
            <ArticleTitle>{data.title}</ArticleTitle>
          </ArticleInfoWrapper>
        </ArticleWrapper>
      </ArticleItemContainer>
    );
  }
};

export default React.memo(ArticleList, (prevProps, nextProps) => {
    return prevProps.selectedSection === nextProps.selectedSection;
});
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

const ArticleListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 50%;
  background-color: ${props => props.theme.foreground};
  border-radius: 8px;
  padding: 12px;
  gap: 8px;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
`

const LoadingIcon = styled.img`
  animation: ${rotateAnimation} 4s cubic-bezier(.25,.51,.43,.7) infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 48px;
  height: 48px;
`

const ArticleItemContainer = styled.div`
  position: relative;
  animation: ${showListAnimation} 0.5s ease-in-out forwards;
  opacity: 0;

  display: flex;
  flex-direction: column;


  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${props => props.theme.foreground};
    filter: ${props => props.showOption ? 'brightness(1)' : 'brightness(0.9)'};
  }
  &:active {
    filter: ${props => props.showOption ? 'brightness(1)' : 'brightness(0.8)'};
  }
`

const ArticleWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const ArticleInfoWrapper = styled.div`
  width: calc(100% - 12px);
  display: flex;
  flex-direction: column;
`

const ArticleRank = styled.div`
  color: ${props => props.theme.primary};
  font-size: 10px;
  font-weight: 500;
`

const ArticleInfo = styled.div`
  color: ${props => props.theme.subText};
  font-size: 10px;
`

const ArticleTitle = styled.div`
  color: ${props => props.theme.contentText};
  font-size: 12px;
  font-weight: 500;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ListName = styled.div`
  animation: ${showListAnimation} 0.5s ease-in-out forwards;
  color: ${props => props.theme.contentText};
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  opacity: 0;
`
