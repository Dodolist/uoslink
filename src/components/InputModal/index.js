import axios from 'axios';
import React, { useEffect } from 'react';
import LogoIcon from '../../images/logo.svg';
import LoadingIcon from '../../images/loading.svg';
import XIcon from '../../images/x-icon.svg';
import { InputModalWrap, ModalTitle, InputWrap, InputLabel, InputBox, Input, ButtonWrap, Button, SiteLogo, SiteLogoLoading, InvalidIcon } from './style';

const InputModal = ({ isInputModalOpen, closeInputModal }) => {
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [urlLogo, setUrlLogo] = React.useState(LogoIcon);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [timer, setTimer] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInvalidIcon, setIsInvalidIcon] = React.useState(false);

  const addSite = () => {
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

    const sites = JSON.parse(localStorage.getItem('sites'));
    if(sites === null) {
      localStorage.setItem('sites', JSON.stringify([site]));
    } else {
      sites.push(site);
      localStorage.setItem('sites', JSON.stringify(sites));
    }
    setName('');
    setUrl('');
    closeInputModal();
  };

  useEffect(() => {
    setIsLoading(true);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      let getUrl = 'https://www.iflab.run/api/check/url/' + url;
      axios.get(getUrl)
        .then((response) => {
          if (url === '') {
            setUrlLogo(LogoIcon);
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          } else {
            if (!url.includes('www.')) {
              setUrlLogo('https://www.' + url + '/favicon.ico');
            }
            else if (!url.includes('http://') && !url.includes('https://')) {
              setUrlLogo('https://' + url + '/favicon.ico');
            } else {
              setUrlLogo(url + '/favicon.ico');
            }
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }
          setIsInvalidIcon(false);
        })
        .catch((error) => {
          setIsInvalidIcon(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });
    }, 1000);

    setTimer(newTimer);
  }, [url]);

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

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  }

  return (
    <InputModalWrap isOpen={isInputModalOpen}>
      <ModalTitle>바로가기 추가</ModalTitle>
      <InputWrap>
        <InputLabel>이름</InputLabel>
        <InputBox>
          <Input
            type="text"
            value={name}
            onChange={onChangeName}
            maxLength={10}
          />
        </InputBox>
      </InputWrap>
      <InputWrap>
        <InputLabel>사이트 주소</InputLabel>
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
        <Button onClick={closeInputModal}>취소</Button>
        <Button
          color={"blue"}
          type={isDisabled}
          onClick={addSite}
        >
          추가
        </Button>
      </ButtonWrap>
    </InputModalWrap>
  );
};

export default InputModal;
