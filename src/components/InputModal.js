import axios from 'axios';
import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import LogoIcon from '../images/logo.svg';
import LoadingIcon from '../images/loading.svg';
import XIcon from '../images/x-icon.svg';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  } 
`;

const vibrateAnimation = keyframes`
  0% {
    transform: translateX(0px);
  }
  20% {
    transform: translateX(-4px);
  }
  40% {
    transform: translateX(4px);
  }
  60% {
    transform: translateX(-2px);
  }
  80% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0px);
  }
`;

const InputModalWrap = styled.div`
  z-index: 300;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${(props) => props.isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -55%)'};
  opacity: ${(props) => props.isOpen ? '1' : '0'};
  user-select: ${(props) => props.isOpen ? 'auto' : 'none'};
  pointer-events: ${(props) => props.isOpen ? 'auto' : 'none'};

  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.mode === 'light' ? '#ffffff' : '#1d2128'};
  border-radius: 12px;
  padding: 24px 24px 16px 24px;
`

const ModalTitle = styled.div`
  color: ${(props) => props.theme.titleText};
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  letter-spacing: -1px;
`

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`

const InputLabel = styled.div`
  color: ${(props) => props.theme.subText};
  font-size: 12px;
  letter-spacing: -1px;
`

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  min-width: 330px;
  height: 40px;
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: ${(props) => props.theme.mode === 'light' ? '1px solid #f0f1f5' : '1px solid #2c3038'};
  outline: none;
  color: ${(props) => props.theme.contentText};
  font-size: 14px;
  letter-spacing: -1px;

  background-color: ${(props) => props.theme.foreground};
  padding: 4px 4px 4px 8px;
  border-radius: 8px;

  &:focus {
    border: 1px solid #00000040;
  }
`

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  gap: 12px;
`

const Button = styled.button`
  color: ${(props) => props.theme.titleText};
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -1px;

  width: 100%;
  padding: 20px 0;
  background-color: ${(props) => props.theme.foreground};

  border: none;
  border-radius: 12px;
  outline: none;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    transition: all 0.05s;
    filter: brightness(0.8);
  }

  ${(props) => props.color === 'blue' && css`
    color: #ffffff;
    background-color: #408cff;
  `}
  ${(props) => props.type === true && css`
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
  `}
    
`
const SiteLogo = styled.img`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  scale: ${(props) => props.loading ? '0' : '1'};
`

const SiteLogoLoading = styled.img`
  animation: ${rotateAnimation} 1s linear infinite;
  position: absolute;
  right: 4px;
  width: 32px;
  height: 32px;
  scale: ${(props) => props.loading ? '1' : '0'};
`

const InvalidIcon = styled.img`
  animation: none;
  position: absolute;
  right: 4px;
  width: 32px;
  height: 32px;
  scale: ${(props) => props.loading ? '1' : '0'};

  ${(props) => props.loading && css`
    animation: ${vibrateAnimation} 0.5s ease-in-out;
  `}
`

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
