import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loadingIcon from '../../images/loading-icon.svg';
import { ArticleListContainer, LoadingIcon, ArticleItemContainer, ArticleWrapper, ArticleInfoWrapper, ArticleRank, ArticleInfo, ArticleTitle, ListName } from './style';

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
        <ArticleWrapper alreadyRead={alreadyRead}>
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
