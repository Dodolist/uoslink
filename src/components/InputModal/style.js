import styled, { css, keyframes } from 'styled-components';

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

export { InputModalWrap, ModalTitle, InputWrap, InputLabel, InputBox, Input, ButtonWrap, SiteLogo, SiteLogoLoading, InvalidIcon };
