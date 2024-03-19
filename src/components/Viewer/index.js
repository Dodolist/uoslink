import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import attachedFileIcon from "../../images/attached-file-icon.svg";
import closeIcon from "../../images/gray-close-icon.svg";
import bookmarkIcon from "../../images/gray-bookmark24-icon.svg";
import outlinkIcon from "../../images/outlink-icon.svg";
import copyIcon from "../../images/copy-icon.svg";
import loadingIcon from "../../images/loading-icon.svg";
import checkIcon from "../../images/check-icon.svg";
import BlackScreen from "../BlackScreen";
import FloatButton from "./FloatButton";
import Toast from "../Toast";

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  } 
`;

const ViewerContainer = styled.div`
  z-index: 300;
  position: fixed;
  top: ${(props) => (props.isShow ? "50%" : "70%")};
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center left;
  scale: ${(props) => (props.isShow ? "1" : "0.7")};
  opacity: ${(props) => (props.isShow ? "1" : "0")};

  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.foreground};
  border-radius: 12px;
  padding: 24px 24px 0 24px;

  width: 60%;
  height: 90%;

  user-select: ${(props) => (props.isShow ? "auto" : "none")};
  pointer-events: ${(props) => (props.isShow ? "auto" : "none")};

  transition: ${(props) => (props.dragging ? "none" : "all 0.3s ease")};
`;

const ViewerTitle = styled.div`
  color: ${(props) => props.theme.titleText};
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
  margin-bottom: 8px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ViewerInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  gap: 8px;
`;

const ViewerInfoItem = styled.div`
  color: ${(props) => props.theme.subText};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.5px;
`;

const ViewerDivider = styled.div`
  height: 1px;
  background-color: ${(props) =>
    props.theme.mode === "light" ? "#00000020" : "#ffffff20"};
  margin-bottom: 12px;
  border-radius: 1px;
`;

const ViewerContentWrapper = styled.div`
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
`;

const ViewerContent = styled.div`
  filter: ${(props) =>
    props.theme.mode === "dark" ? "invert(1)" : "invert(0)"};
  .vw-con img {
    filter: ${(props) =>
      props.theme.mode === "dark" ? "invert(1)" : "invert(0)"};
  }
`;

const NoticeAttachedFile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`;

const NoticeAttachedFileItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const NoticeAttachedFileItemNameWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 320px;
  gap: 4px;

  padding: 8px 16px 8px 4px;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 4px;
  text-decoration: none;

  &:hover {
    filter: brightness(0.9);
    background-color: ${(props) =>
      props.theme.mode === "light" ? "#98bffa80" : "#00000040"};
  }

  &:active {
    filter: brightness(0.8);
  }
`;

const NoticeAttachedFileItemName = styled.div`
  color: ${(props) => props.theme.primary};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoticeAttachedFileItemViewButton = styled.a`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: max-content;
  padding: 8px;
  background-color: ${(props) => props.theme.primary};
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

  ${(props) =>
    props.disabled &&
    css`
      cursor: default;
      user-select: none;
      pointer-events: none;
      background-color: ${(props) => props.theme.subText};
      color: ${(props) => props.theme.contentText};
      opacity: 0.5;
      &:hover {
        filter: brightness(1);
      }
      &:active {
        filter: brightness(1);
      }
    `}
`;

const FloatButtonWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: calc(100% + 16px);

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

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
`;

const LoadingIcon = styled.img`
  animation: ${rotateAnimation} 4s cubic-bezier(0.25, 0.51, 0.43, 0.7) infinite;
  width: 48px;
  height: 48px;
`;

const LoadingText = styled.div`
  color: ${(props) => props.theme.titleText};
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -2px;
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Viewer = ({
  isViewerOpen,
  selectedNoticeId,
  selectedNoticeSection,
  selectedNoticeLink,
  closeViewer,
}) => {
  const [NoticeItem, setNoticeItem] = useState(null);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isCopyToast, setIsCopyToast] = useState(false);
  const [isBookmarkToast, setIsBookmarkToast] = useState(false);
  const [timer, setTimer] = useState(null);
  const [isCopyClick, setIsCopyClick] = useState(0);

  const toastObject = {
    copy: {
      state: isCopyToast,
      setState: (state) => setIsCopyToast(!state),
    },
    bookmark: {
      state: isBookmarkToast,
      setState: (state) => setIsBookmarkToast(!state),
    },
  };

  //toast 메시지 간 중복 제어
  function setOtherToast(type, toastObject) {
    Object.entries(toastObject).map(
      ([key, value]) =>
        key !== type && value.state && value.setState(value.state)
    );
  }

  //toast 메시지 삭제
  function deleteToast(toastObject) {
    Object.entries(toastObject).map(
      ([key, value]) => value.state && value.setState(value.state)
    );
  }

  useEffect(() => {
    // 공지사항이 닫히면 0.3초 후에 공지사항 데이터를 초기화한다.
    if (!isViewerOpen) {
      setTimeout(() => {
        setNoticeItem(null);
      }, 300);
    } else {
      window.addEventListener("keydown", handleKeyDown);
    }

    if (localStorage.getItem("bookmark")) {
      let bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
      if (bookmarkList.find((item) => item.id === selectedNoticeId)) {
        setIsBookmark(true);
      } else {
        setIsBookmark(false);
      }
    }

    // 공지사항이 열리면 공지사항 데이터를 가져온다.
    if (
      !isViewerOpen ||
      !selectedNoticeId ||
      !selectedNoticeSection ||
      !selectedNoticeLink
    )
      return;
    let url;
    if (selectedNoticeSection === "SC1") {
      url = "https://www.iflab.run/api/scraping/notice/content/scholarship";
      axios
        .post(url, { url: selectedNoticeLink })
        .then((response) => {
          setNoticeItem(response.data);
        })
        .catch((error) => {
          console.error("API 요청 중 오류 발생:");
        });
    } else {
      url =
        "https://www.iflab.run/api/scraping/notice/content/" +
        selectedNoticeSection +
        "/" +
        selectedNoticeLink;
      axios
        .get(url)
        .then((response) => {
          setNoticeItem(response.data);
        })
        .catch((error) => {
          console.error("API 요청 중 오류 발생:");
        });
    }
    //toast 메시지 삭제
    deleteToast(toastObject);
  }, [
    isViewerOpen,
    selectedNoticeId,
    selectedNoticeSection,
    selectedNoticeLink,
  ]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeViewer();
      window.removeEventListener("keydown", handleKeyDown);
    }
  };

  const clickBookmark = () => {
    let bookmarkList = [];
    if (localStorage.getItem("bookmark")) {
      bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
    }
    if (isBookmark) {
      if (selectedNoticeId !== "SEARCH") {
        axios.post("https://www.iflab.run/api/notices/bookmark/delete", {
          id: selectedNoticeId,
        });
      }
      bookmarkList = bookmarkList.filter(
        (item) => item.id !== selectedNoticeId
      );
    } else {
      if (selectedNoticeId !== "SEARCH") {
        axios.post("https://www.iflab.run/api/notices/bookmark/add", {
          id: selectedNoticeId,
        });
      }

      let bookmarkObject = {
        id: selectedNoticeId,
        title: NoticeItem.title,
        author: NoticeItem.author,
        writtenAt: NoticeItem.writtenAt,
        section: selectedNoticeSection,
        link: selectedNoticeLink,
      };
      bookmarkList.push(bookmarkObject);
    }
    localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
    setIsBookmark(!isBookmark);

    //북마크 토스트 메시지
    setOtherToast("bookmark", toastObject);
    setIsBookmarkToast(true);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      setIsBookmarkToast(false);
    }, 2000);
    setTimer(newTimer);
  };
  const clickOutlink = () => {
    setTimeout(() => {
      if (selectedNoticeSection === "SC1") {
        window.open(selectedNoticeLink, "_blank");
      } else {
        window.open(
          "https://uos.ac.kr/korNotice/view.do?list_id=" +
            selectedNoticeSection +
            "&seq=" +
            selectedNoticeLink +
            "&epTicket=INV",
          "_blank"
        );
      }
    }, 100);
  };

  const clickCopy = () => {
    if (selectedNoticeSection === "SC1") {
      navigator.clipboard.writeText(selectedNoticeLink);
    } else {
      navigator.clipboard.writeText(
        "https://uos.ac.kr/korNotice/view.do?list_id=" +
          selectedNoticeSection +
          "&seq=" +
          selectedNoticeLink +
          "&epTicket=INV"
      );
    }
    setOtherToast("copy", toastObject);
    setIsCopyClick((prev) => prev + 1);
    setIsCopyToast(true);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      setIsCopyToast(false);
    }, 2000);
    setTimer(newTimer);
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
      <BlackScreen isOpen={isViewerOpen} />
      <ViewerContainer isShow={isViewerOpen}>
        <ViewerTitle>{NoticeItem.title}</ViewerTitle>
        <ViewerInfo>
          <ViewerInfoItem>{NoticeItem.author}</ViewerInfoItem>
          <ViewerInfoItem>{NoticeItem.writtenAt}</ViewerInfoItem>
        </ViewerInfo>
        <ViewerDivider />
        <ViewerContentWrapper>
          {NoticeItem.attachedFile && NoticeItem.attachedFile.length > 0 && (
            <div>
              <NoticeAttachedFile>
                {NoticeItem.attachedFile.map((file, index) => (
                  <NoticeAttachedFileItem key={index}>
                    <NoticeAttachedFileItemNameWrapper href={file.downloadLink}>
                      <img src={attachedFileIcon} />
                      <NoticeAttachedFileItemName>
                        {file.name}
                      </NoticeAttachedFileItemName>
                    </NoticeAttachedFileItemNameWrapper>
                    {selectedNoticeSection !== "SC1" && (
                      <NoticeAttachedFileItemViewButton
                        href={file.viewLink}
                        target="_blank"
                        disabled={file.viewLink === ""}
                      >
                        바로보기
                      </NoticeAttachedFileItemViewButton>
                    )}
                  </NoticeAttachedFileItem>
                ))}
              </NoticeAttachedFile>
              <ViewerDivider />
            </div>
          )}
          <ViewerContent
            dangerouslySetInnerHTML={{ __html: NoticeItem.content }}
          />
        </ViewerContentWrapper>
        <FloatButtonWrapper>
          <FloatButton onClick={closeViewer} icon={closeIcon} />
          <FloatButton
            onClick={clickBookmark}
            icon={bookmarkIcon}
            active={isBookmark}
          />
          <FloatButton onClick={clickOutlink} icon={outlinkIcon} />
          <FloatButton
            onClick={clickCopy}
            icon={copyIcon}
            active={isCopyToast}
          />
        </FloatButtonWrapper>
        <ToastContainer>
          <Toast
            icon={checkIcon}
            type="bookmarkup"
            toastState={isBookmarkToast}
            toastOption={isBookmark}
          ></Toast>
          <Toast
            icon={checkIcon}
            type="bookmarkdown"
            toastState={isBookmarkToast}
            toastOption={isBookmark}
          ></Toast>
          <Toast
            icon={checkIcon}
            type="copy"
            toastState={isCopyToast}
            copyClick={isCopyClick}
          ></Toast>
        </ToastContainer>
      </ViewerContainer>
    </div>
  ) : (
    <div>
      <BlackScreen isOpen={isViewerOpen} />
      <ViewerContainer isShow={isViewerOpen}>
        <LoadingWrapper>
          <LoadingIcon src={loadingIcon} />
          <LoadingText>공지사항을 불러오고 있어요!</LoadingText>
        </LoadingWrapper>
        <FloatButtonWrapper>
          <FloatButton onClick={closeViewer} icon={closeIcon} />
          <FloatButton
            icon={bookmarkIcon}
            active={isBookmark}
            disabled={true}
          />
          <FloatButton onClick={clickOutlink} icon={outlinkIcon} />
          <FloatButton
            onClick={clickCopy}
            icon={copyIcon}
            active={isCopyToast}
          />
        </FloatButtonWrapper>
        <ToastContainer>
          <Toast
            icon={checkIcon}
            type="copy"
            toastState={isCopyToast}
            copyClick={isCopyClick}
          ></Toast>
        </ToastContainer>
      </ViewerContainer>
    </div>
  );
};

export default Viewer;

/*
      <ViewerContainer
        isShow={isViewerOpen}
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
