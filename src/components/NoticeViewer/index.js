import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import attachedFileIcon from '../../images/attached-file-icon.svg';
import closeIcon from '../../images/gray-close-icon.svg';
import bookmarkIcon from '../../images/gray-bookmark24-icon.svg';
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

const FloatButton = styled.div`
  position: relative;
  background-color: ${props => props.active ? '#f0f1f500' : props.theme.foreground};
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;

  width: 48px;
  height: 48px;

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    filter: brightness(0.8);
    transform: translateY(2px);
  }
  &::before {
    transition: all 0.3s ease;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    width: ${props => props.active ? '68px' : '0px'};
    height: ${props => props.active ? '68px' : '0px'};
    opacity: ${props => props.active ? '1' : '0'};
    background-color: #408cff;
    border-radius: 50%;
    user-select: none;
  }
`
const FloatButtonIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
  filter: ${props => props.active ? 'brightness(2)' : 'brightness(1)'};
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

const NoticeViewer = ({ isNoticeViewerOpen, selectedNoticeId, selectedNoticeSection, selectedNoticeLink, closeNoticeViewer }) => {
  const [NoticeItem, setNoticeItem] = useState(null);
  const [isBookmark, setIsBookmark] = useState(false);
  useEffect(() => {
    // 공지사항이 닫히면 0.3초 후에 공지사항 데이터를 초기화한다.
    if (!isNoticeViewerOpen) {
      setTimeout(() => {
        setNoticeItem(null);
      }, 300);
    }

    if (localStorage.getItem('bookmark')) {
      let bookmarkList = JSON.parse(localStorage.getItem('bookmark'));
      if (bookmarkList.find(item => item.id === selectedNoticeId)) {
        setIsBookmark(true);
      } else {
        setIsBookmark(false);
      }
    }

    // 공지사항이 열리면 공지사항 데이터를 가져온다.
    if (!isNoticeViewerOpen || !selectedNoticeId || !selectedNoticeSection || !selectedNoticeLink) return;
    let url = 'https://www.iflab.run/api/scraping/notice/content/' + selectedNoticeSection + '/' + selectedNoticeLink;
    axios.get(url)
      .then(response => {
        setNoticeItem(response.data);
      })
      .catch(error => {
        console.error('API 요청 중 오류 발생:');
      });
  }, [isNoticeViewerOpen, selectedNoticeId, selectedNoticeSection, selectedNoticeLink]);

  const clickBookmark = () => {
    let bookmarkList = [];
    if (localStorage.getItem('bookmark')) {
      bookmarkList = JSON.parse(localStorage.getItem('bookmark'));
    }
    if (isBookmark) {
      axios.post('https://www.iflab.run/api/notices/bookmark/delete', {
        id: selectedNoticeId
      });

      bookmarkList = bookmarkList.filter(item => item.id !== selectedNoticeId);
    } else {
      axios.post('https://www.iflab.run/api/notices/bookmark/add', {
        id: selectedNoticeId
      });

      let bookmarkObject = {
        id: selectedNoticeId,
        title: NoticeItem.title,
        author: NoticeItem.author,
        writtenAt: NoticeItem.writtenAt,
        section: selectedNoticeSection,
        link: selectedNoticeLink
      };
      bookmarkList.push(bookmarkObject);
    }
    localStorage.setItem('bookmark', JSON.stringify(bookmarkList));
    setIsBookmark(!isBookmark);
  };

  const clickOutlink = () => {
    setTimeout(() => {
      window.open('https://uos.ac.kr/korNotice/view.do?list_id=' + selectedNoticeSection + '&seq=' + selectedNoticeLink + '&epTicket=INV', '_blank');
    }, 100);
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
          <FloatButton onClick={closeNoticeViewer}>
            <FloatButtonIcon src={closeIcon} />
          </FloatButton>
          <FloatButton active={isBookmark} onClick={clickBookmark}>
            <FloatButtonIcon active={isBookmark} src={bookmarkIcon} />
          </FloatButton>
          <FloatButton onClick={clickOutlink}>
            <FloatButtonIcon src={outlinkIcon} />
          </FloatButton>
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
          <FloatButton onClick={closeNoticeViewer}>
            <FloatButtonIcon src={closeIcon} />
          </FloatButton>
          <FloatButton active={isBookmark}>
            <FloatButtonIcon active={isBookmark} src={bookmarkIcon} />
          </FloatButton>
          <FloatButton>
            <FloatButtonIcon src={outlinkIcon} />
          </FloatButton>
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
