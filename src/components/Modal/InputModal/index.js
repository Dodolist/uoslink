import React, { useEffect } from 'react';
import axios from 'axios';
import LogoIcon from '../../../images/logo.svg';
import LoadingIcon from '../../../images/loading.svg';
import XIcon from '../../../images/x-icon.svg';
import { InputBox, Input, SiteLogo, SiteLogoLoading, InvalidIcon } from './style';
import InputWrap from '../../Input';
import Modal from '../../Modal';
import { ButtonWrap } from '../style';
import Button from '../../Buttons';
import DeleteButton from '../../Buttons/DeleteButton';

const InputModal = ({ isModified, isInputModalOpen, closeInputModal, addSite, modifySite, deleteSite, loadName, loadUrl }) => {
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [urlLogo, setUrlLogo] = React.useState(LogoIcon);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [timer, setTimer] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInvalidIcon, setIsInvalidIcon] = React.useState(false);

  const checkSite = () => {
    if (isDisabled) {
      return;
    }
    var link;
    if (!url.includes('www.')) {
      link = 'https://www.' + url;
    }
    else if (!url.includes('http://') && !url.includes('https://')) {
      link = 'https://' + url;
    }
    const site = {
      name,
      link,
    };
    
    if (isModified) {
      modifySite(site);
    } else {
      addSite(site);
    }
    initInput();
  };

  const initInput = () => {
    setTimeout(() => {
      setName('');
      setUrl('');
      setUrlLogo(LogoIcon);
      setIsDisabled(true);
      setIsLoading(false);
      setIsInvalidIcon(false);
    }, 200);
  };

  const clickCancelButton = () => {
    initInput();
    closeInputModal();
  };

  const clickDeleteButton = () => {
    deleteSite();
    closeInputModal();
    initInput();
  };

  useEffect(() => {
    if (isModified) {
      setName(loadName);
      setUrlLogo(loadUrl+'/favicon.ico');
      loadUrl = loadUrl.replace('https://www.', '');
      setUrl(loadUrl);
    }
  }, [isModified]);

  // 확인 Button 활성화 여부
  useEffect(() => {
    if(name.trim() !== '' && url.trim() !== '' && !isInvalidIcon && !isLoading) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, url, isInvalidIcon, isLoading]);


  const onChangeName = (e) => {
    setName(e.target.value);
  };

  // url 입력 시 favicon 확인
  const onChangeUrl = (e) => {
    let newUrl = e.target.value;
    setUrl(newUrl);

    /* url이 비어있을 때에는
     * 로고를 기본 로고로 변경
     * isInvalidIcon을 false로 변경
     * timer 초기화
    */
    if (newUrl === '') {
      setUrlLogo(LogoIcon);
      setIsLoading(false);
      setIsInvalidIcon(false);
      clearTimeout(timer);
      return;
    }

    /* timer가 있을 때에는
     * timer를 초기화
    */
    if (timer) {
      clearTimeout(timer);
    }

    /* timer 생성*/
    setIsLoading(true);

    const newTimer = setTimeout(() => {
      let getUrl = 'https://www.iflab.run/api/check/url/' + newUrl;
      axios.get(getUrl)
        .then((response) => {
          if (!newUrl.includes('www.')) {
            setUrlLogo('https://www.' + newUrl + '/favicon.ico');
          }
          else if (!newUrl.includes('http://') && !newUrl.includes('https://')) {
            setUrlLogo('https://' + newUrl + '/favicon.ico');
          } else {
            setUrlLogo(newUrl + '/favicon.ico');
          }
          setIsInvalidIcon(false);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        })
        .catch((error) => {
          setIsInvalidIcon(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });
    }, 1000);

    setTimer(newTimer);
  }

  return (
    <Modal
      isOpen={isInputModalOpen}
      title={isModified ? '바로가기 수정' : '바로가기 추가'}
    >
      <InputWrap label={'이름'}>
        <InputBox>
          <Input
            type="text"
            value={name}
            onChange={onChangeName}
            maxLength={10}
          />
        </InputBox>
      </InputWrap>
      <InputWrap label={'사이트 주소'}>
        <InputBox>
          <Input
            type="text"
            value={url}
            onChange={onChangeUrl}
          />
          <SiteLogo
            src={urlLogo}
            loading={isLoading || isInvalidIcon}
          />
          <SiteLogoLoading
            src={LoadingIcon}
            loading={isLoading}
          />
          <InvalidIcon
            src={XIcon}
            loading={!isLoading && isInvalidIcon}
          />
        </InputBox>
      </InputWrap>
      <ButtonWrap>
        <Button onClick={clickCancelButton}>취소</Button>
        <Button
          color={"blue"}
          type={isDisabled ? "disabled" : "active"}
          onClick={checkSite}
        >
        {isModified ? '수정' : '추가'}
        </Button>
      </ButtonWrap>
      <DeleteButton
        isOpen={isModified}
        onClick={clickDeleteButton}
      >
        삭제
      </DeleteButton>
    </Modal>
  );
};

export default InputModal;
