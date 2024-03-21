import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { NoticeListContainer, LoadingIcon, NoItemContainer, NoItemText, NoticeItemContainer, NoticeWrapper, NoticeTitle, NoticeInfoWrapper, NoticeInfo, NoticeOptionButton, NoticeOptionWrapper, NoticeOptionItem, NoticeOptionText, NoticeOptionIcon } from './style';
import loadingIcon from '../../images/loading-icon.svg';
import kebabIcon from '../../images/kebab-icon.svg';
// import bookmarkIcon from '../../images/gray-bookmark24-icon.svg';
import readCheckIcon from '../../images/read-check-icon.svg';
import unreadCheckIcon from '../../images/unread-check-icon.svg';
import MajorInputModal from '../Modal/MajorInputModal';
import Button from '../Buttons';

const NoticeList = ({selectedSection, searchText, openViewer}) => {
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
    if(selectedSection === 'SEARCH') {
      setIsLoading(true);
      let url = 'https://www.iflab.run/api/search/notice/' + searchText;
      axios.get(url)
        .then((response) => {
          setItems(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('API 요청 중 오류 발생:');
        });
    }
    else if(selectedSection === 'DA1') {
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
  }, [selectedSection, searchText]);

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
        ) : (items.map((item, index) => (
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
    if (selectedSection === 'BM' || selectedSection === 'SEARCH') {
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
      if (selectedSection !== 'BM' && selectedSection !== 'SEARCH') {
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
        onClick={() => selectedSection === 'BM' ? clickNoticeItem(data.id, data.section, data.link) : selectedSection === 'SEARCH' ? clickNoticeItem('SEARCH', data.section, data.link) : clickNoticeItem(data.id, selectedSection, data.link)}
        showOption={isClickedOption}
        onMouseLeave={() => setIsClickedOption(false)}
      >
        <NoticeWrapper
          alreadyRead={alreadyRead}
          showOption={isClickedOption}
        >
          <NoticeTitle>{data.title}</NoticeTitle>
          <NoticeInfoWrapper>
            {selectedSection === 'BM' || selectedSection === 'SEARCH' ? (
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
            <NoticeInfo>{(selectedSection !== 'BM' && selectedSection !== 'SEARCH') ? `${data.views}회` : null}</NoticeInfo>
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
    return prevProps.selectedSection === nextProps.selectedSection
          && prevProps.searchText === nextProps.searchText;
});
