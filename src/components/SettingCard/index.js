import React, { useState } from 'react';
import { SettingCardContainer, SettingCardTopBar, CardTopBarLeft, CardTitle, SettingContainer} from './style';
import settingIcon from '../../images/white-setting-icon.svg';
import Toggle from '../Input/Toggle';
import closeIcon from '../../images/gray-close-icon.svg';
import SettingItem from './SettingItem';
import ConfirmModal from '../Modal/ConfirmModal';

const SettingCard = ({isShow, theme, isSideBarOpen, handleClose, toggleTheme, toggleSideBar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');

  const openModal = (id) => () => {
    if (id === 'notice') {
      setModalType('notice');
      setModalTitle('읽은 공지 내역을 삭제하실 건가요?');
      setModalSubtitle('삭제한 공지 내역은 되돌릴 수 없어요.');
    } else if ( id === 'major') {
      setModalType('major');
      setModalTitle('선택한 학과를 초기화하시겠어요?');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalTitle('');
      setModalSubtitle('');
    }, 200);
  };

  const resetFunction = () => {
    // 읽은 모든 공지사항 삭제
    if(modalType === 'notice') {
      localStorage.removeItem('noticeId');
    } else if(modalType === 'major') {
      localStorage.removeItem('academicInfo');

      const noticeId = JSON.parse(localStorage.getItem('noticeId'));
      noticeId.DA1 = [];
      localStorage.setItem('noticeId', JSON.stringify(noticeId));

      sessionStorage.removeItem('DA1');
    }
    closeModal();
    window.location.reload(); // 새로고침
  };

  return (
    <>
      <ConfirmModal
        isModalOpen={isModalOpen}
        title={modalTitle}
        subtitle={modalSubtitle}
        closeModal={closeModal}
        handleConfirm={resetFunction}
      />
      <SettingCardContainer
        isshow={undefined ? undefined : isShow}
      >
        <SettingCardTopBar>
          <CardTopBarLeft>
            <img src={settingIcon} />
            <CardTitle>설정</CardTitle>
          </CardTopBarLeft>
          <img className="icon" src={closeIcon} onClick={handleClose} />
        </SettingCardTopBar>
        <SettingContainer>
          <SettingItem title="다크모드 변경">
            <Toggle active={theme === 'dark'} handleClick={toggleTheme} />
          </SettingItem>
          <SettingItem title="사이드바 표시">
            <Toggle active={isSideBarOpen} handleClick={toggleSideBar} />
          </SettingItem>
          <SettingItem title="읽은 공지 초기화" caution="true" handleClick={openModal('notice')} />
          <SettingItem title="학과 공지 초기화" caution="true" handleClick={openModal('major')} />
        </SettingContainer>
      </SettingCardContainer>
    </>
  );
}

export default SettingCard;
