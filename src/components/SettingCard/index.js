import React, { useState } from 'react';
import { SettingCardContainer, SettingCardTopBar, CardTopBarLeft, CardTitle, SettingContainer} from './style';
import settingIcon from '../../images/white-setting-icon.svg';
import Toggle from '../Input/Toggle';
import closeIcon from '../../images/gray-close-icon.svg';
import SettingItem from './SettingItem';
import ConfirmModal from '../Modal/ConfirmModal';

const SettingCard = ({isShow, theme, isSideBarOpen, handleClose, toggleTheme, toggleSideBar }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };
  
  return (
    <>
      <ConfirmModal
        isConfirmModalOpen={isConfirmModalOpen}
        title={'읽은 공지 내역을 삭제하실 건가요?'}
        subtitle={'삭제한 공지 내역은 되돌릴 수 없어요.'}
        closeConfirmModal={closeConfirmModal}
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
          <SettingItem title="읽은 공지 초기화" caution="true" handleClick={openConfirmModal} />
        </SettingContainer>
      </SettingCardContainer>
    </>
  );
}

export default SettingCard;
