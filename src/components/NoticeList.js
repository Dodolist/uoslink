import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const NoticeList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('https://api.adrinerlab.co.kr/articles/FA1')
      .then(response => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('API 요청 중 오류 발생:', error);
      });
  }, []);
  return (
    <NoticeListContainer>
      {items.map((item, index) => (
        <NoticeItem key={index} data={item} />
      ))}
      <NoticeItem>
        <NoticeTitle>2021학년도 1학기 장학금 신청 안내</NoticeTitle>
        <NoticeWrapper>
          <NoticeInfo>2021.03.01</NoticeInfo>
          <NoticeInfo>학생지원처</NoticeInfo>
        </NoticeWrapper>
      </NoticeItem>
    </NoticeListContainer>
  );

  function NoticeItem({ data }) {
    if (!data || typeof data !== 'object' || !data.title) {
      return null; // 렌더링하지 않음 또는 오류 처리
    }
    return (
      <NoticeItemContainer href={data.link}>
        <NoticeTitle>{data.title}</NoticeTitle>
        <NoticeWrapper>
          <NoticeInfo>{data.writtenAt}</NoticeInfo>
          <NoticeInfo>{data.author}</NoticeInfo>
        </NoticeWrapper>
      </NoticeItemContainer>
    );
  }
};

export default NoticeList;

const NoticeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px 8px 0 0;
  background-color: #f0f1f5;
  border-radius: 8px;
  overflow: hidden;
`;

const NoticeItemContainer = styled.a`
  transition: all 0.2s;
  display: flex;
  flex-direction: column;

  background-color: #f0f1f5;
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

