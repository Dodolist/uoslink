import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import attachedFileIcon from '../../images/attached-file-icon.svg';
import closeIcon from '../../images/gray-close-icon.svg';
import outlinkIcon from '../../images/outlink-icon.svg';
import loadingIcon from '../../images/loading-icon.svg';
import BlackScreen from '../BlackScreen';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  } 
`;

const NoticeViewerContainer = styled.div`
  z-index: 300;
  position: fixed;
  top: ${props => props.isShow ? '50%' : '70%'};
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center left;
  scale: ${props => props.isShow ? '1' : '0.7'};
  opacity: ${props => props.isShow ? '1' : '0'};

  display: flex;
  flex-direction: column;

  background-color: ${props => props.theme.foreground};
  border-radius: 12px;
  padding: 24px 24px 0 24px;

  width: 60%;
  height: 90%;

  user-select: ${props => props.isShow ? 'auto' : 'none'};
  pointer-events: ${props => props.isShow ? 'auto' : 'none'};

  transition: ${props => props.dragging ? 'none' : 'all 0.3s ease'};

`;

const NoticeViewerTitle = styled.div`
  color: ${props => props.theme.titleText};
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
  margin-bottom: 8px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const NoticeViewerInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
`

const NoticeViewerInfoItem = styled.div`
  color: ${props => props.theme.subText};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.5px;
`

const NoticeViewerDivider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.mode === 'light' ? '#00000020' : '#ffffff20'};
  margin-bottom: 12px;
  border-radius: 1px;
`

const NoticeViewerContentWrapper = styled.div`
  word-break: break-all;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  letter-spacing: -0.5px;
  height: 100%;
  padding-bottom: 40px;

  overflow-y: scroll;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
`

const NoticeViewerContent = styled.div`
  filter: ${props => props.theme.mode === 'dark' ? 'invert(1)' : 'invert(0)'};
  .vw-con img {
    filter: ${props => props.theme.mode === 'dark' ? 'invert(1)' : 'invert(0)'};
  }
`

const NoticeAttachedFile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px; 
`

const NoticeAttachedFileItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`

const NoticeAttachedFileItemNameWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 320px;
  gap: 4px;
  
  padding: 8px 16px 8px 4px;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
  text-decoration: none;

  &:hover {
    filter: brightness(0.9);
    background-color: ${props => props.theme.mode === 'light' ? '#98bffa80' : '#00000040'};
  }

  &:active {
    filter: brightness(0.8);
  }
`

const NoticeAttachedFileItemName = styled.div`
  color: ${props => props.theme.primary};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const NoticeAttachedFileItemViewButton = styled.a`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: max-content;
  padding: 8px;
  background-color: ${props => props.theme.primary};
  border-radius: 4px;

  color: #ffffff;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.5px;
  text-decoration: none;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.8);
  }


  ${props => props.disabled && css`
    cursor: default;
    user-select: none;
    pointer-events: none;
    background-color: ${props => props.theme.subText};
    color: ${props => props.theme.contentText};
    opacity: 0.5;
    &:hover {
      filter: brightness(1);
    }
    &:active {
      filter: brightness(1);
    }
  `}
`

const FloatButtonWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: calc(100% + 16px);

  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FloatButton = styled.img`
  background-color: ${props => props.theme.foreground};
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;

  width: 48px;
  height: 48px;

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
  }
`

const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const LoadingIcon = styled.img`
  animation: ${rotateAnimation} 4s cubic-bezier(.25,.51,.43,.7) infinite;
  width: 48px;
  height: 48px;
`

const LoadingText = styled.div`
  color: ${props => props.theme.titleText};
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -2px;
`

/*

const NoticeItem = {
  title: "산업통상자원부 R&D 설명회 개최 안내",
  author: "국제교류과",
  writtenAt: "2023-09-22",
  attachedFile: [
    {
      name: "산업통상자원부 R&D 설명회 개최 안내",
      downloadLink: "https://www.uos.ac.kr/common/board-download.do?listId=FA1&seq=26113&fSeq=1",
      viewLink: "https://file.uos.ac.kr/upload/docconvertor/uos/202309/1696057370879/index.html"
    },
    {
      name: "교원임용규정 신구조문 대비표.hwp",
      downloadLink: "https://www.uos.ac.kr/common/board-download.do?listId=FA1&seq=26113&fSeq=2",
      viewLink: "https://file.uos.ac.kr/upload/docconvertor/uos/202309/1696057370879/index.html"
    }
  ]
};

*/

const NoticeViewer = ({ isNoticeViewerOpen, selectedSection, selectedNoticeLink, closeNoticeViewer }) => {
  const [NoticeItem, setNoticeItem] = useState(null);
  useEffect(() => {
    if (!isNoticeViewerOpen) {
      setTimeout(() => {
        setNoticeItem(null);
      }, 300);
    }
    if (!isNoticeViewerOpen || !selectedSection || !selectedNoticeLink) return;
    let url = 'https://www.iflab.run/api/scraping/notice/content/' + selectedSection + '/' + selectedNoticeLink;
    axios.get(url)
      .then(response => {
        setNoticeItem(response.data);
      })
      .catch(error => {
        console.error('API 요청 중 오류 발생:');
      });
  }, [isNoticeViewerOpen]);

  const clickOutlink = () => {
    window.open('https://uos.ac.kr/korNotice/view.do?list_id=' + selectedSection + '&seq=' + selectedNoticeLink + '&epTicket=INV', '_blank');
  };

  /*
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [newPosition, setNewPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const offsetX = e.clientX;
    const offsetY = e.clientY;
    setPosition({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e) => {
    console.log('handleMouseMove');
    if (!isDragging) return;
    const newX = e.clientX - position.x;
    const newY = e.clientY - position.y;
    setNewPosition({ x: newX, y: newY });
    console.log(newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (newPosition.x > -800) {
      setPosition({ x: 0, y: 0 });
      setNewPosition({ x: 0, y: 0 });
    }
  };
  */

  return NoticeItem ? (
    <div>
      <BlackScreen isOpen={isNoticeViewerOpen} />
      <NoticeViewerContainer isShow={isNoticeViewerOpen}>
        <NoticeViewerTitle>
          { NoticeItem.title }
        </NoticeViewerTitle>
        <NoticeViewerInfo>
          <NoticeViewerInfoItem>{ NoticeItem.author }</NoticeViewerInfoItem>
          <NoticeViewerInfoItem>{ NoticeItem.writtenAt }</NoticeViewerInfoItem>
        </NoticeViewerInfo>
        <NoticeViewerDivider />
        <NoticeViewerContentWrapper>
          { NoticeItem.attachedFile && NoticeItem.attachedFile.length > 0 && (
            <div>
            <NoticeAttachedFile>
              { NoticeItem.attachedFile.map((file, index) => (
                <NoticeAttachedFileItem key={index}>
                  <NoticeAttachedFileItemNameWrapper href={file.downloadLink}>
                    <img src={attachedFileIcon} />
                    <NoticeAttachedFileItemName>
                      { file.name }
                    </NoticeAttachedFileItemName>
                  </NoticeAttachedFileItemNameWrapper>
                  <NoticeAttachedFileItemViewButton
                    href={file.viewLink} target="_blank"
                    disabled={file.viewLink === ""}
                  >
                    바로보기
                  </NoticeAttachedFileItemViewButton>
                </NoticeAttachedFileItem>
              ))}
            </NoticeAttachedFile>
            <NoticeViewerDivider />
          </div>
          )}
          <NoticeViewerContent
            dangerouslySetInnerHTML={{__html: NoticeItem.content}}
          />
        </NoticeViewerContentWrapper>
        <FloatButtonWrapper>
          <FloatButton src={closeIcon} onClick={closeNoticeViewer} />
          <FloatButton src={outlinkIcon} onClick={clickOutlink}/>
        </FloatButtonWrapper>
      </NoticeViewerContainer>
    </div>
  ) : (
    <div>
      <BlackScreen isOpen={isNoticeViewerOpen} />
      <NoticeViewerContainer isShow={isNoticeViewerOpen} >
        <LoadingWrapper>
          <LoadingIcon src={loadingIcon} />
          <LoadingText>공지사항을 불러오고 있어요!</LoadingText>
        </LoadingWrapper>
        <FloatButtonWrapper>
          <FloatButton src={closeIcon} onClick={closeNoticeViewer} />
          <FloatButton src={outlinkIcon}/>
        </FloatButtonWrapper>
      </NoticeViewerContainer>
    </div>
  );
};

export default NoticeViewer;

/*
      <NoticeViewerContainer
        isShow={isNoticeViewerOpen}
        ref={dragRef}
        style={{
          translate: `${newPosition.x}px ${newPosition.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        dragging={isDragging}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
*/
