import styled, { css, keyframes } from 'styled-components';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  } 
`;

const showListAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  } 
`;

const NoticeListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 70vh;
  background-color: ${props => props.theme.foreground};
  border-radius: 8px;
  overflow-y: scroll;
  min-width: 400px;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
`;

const NoticeItemContainer = styled.div`
  position: relative;
  animation: ${showListAnimation} 0.5s ease-in-out forwards;
  opacity: 0;

  display: flex;
  flex-direction: column;

  padding: 16px 20px;
  border-bottom: 1px solid #00000010;

  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${props => props.theme.foreground};
    filter: ${props => props.showOption ? 'brightness(1)' : 'brightness(0.9)'};
  }
  &:active {
    filter: ${props => props.showOption ? 'brightness(1)' : 'brightness(0.8)'};
  }
`;

const NoticeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;

  ${props => props.alreadyRead && css`
    filter: opacity(0.5);
    &:hover {
      filter: opacity(0.5) brightness(0.9);
    }
    &:active {
      filter: opacity(0.5) brightness(0.8);
    }
  `}
`;

const NoticeTitle = styled.span`
  color: ${props => props.theme.contentText};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
`;

const NoticeInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const NoticeInfo = styled.span`
  color: ${props => props.theme.contentText};
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -1px;

  &:last-child {
    flex-grow: 1;
    text-align: right;
  }

  ${props => props.blue && css`
    color: ${props => props.theme.primary};
  `}
  
`;

const NoItemContainer = styled.div`
  animation: ${showListAnimation} 0.5s ease-in-out forwards;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const NoItemText = styled.span`
  width: max-content;

  color: ${props => props.theme.contentText};
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -3px;
  text-align: center;
`;

const NoticeOptionButton = styled.img`
  position: absolute;
  top: 12px;
  right: 8px;
  width: 24px;
  height: 24px;
  opacity: 0;
  ${NoticeItemContainer}:hover & {
    opacity: 1;
  }
`

const NoticeOptionWrapper = styled.div`
  position: absolute;
  top: 36px;
  right: 20px;
  display: flex;
  flex-direction: column;
  background-color: #3c414c;
  border-radius: 4px;

  overflow: hidden;
  user-select: none;

  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
  transform-origin: top right;
  transition-duration: 0.1s;

  ${NoticeItemContainer}:hover & {
    transition-duration: ${props => props.isClicked ? '0.2s' : '0.1s'};
    opacity: ${props => props.isClicked ? '1' : '0'};
    transform: ${props => props.isClicked ? 'scale(1)' : 'scale(0.8)'};
    pointer-events: ${props => props.isClicked ? 'auto' : 'none'};
  }
`

const NoticeOptionItem = styled.div`
  min-width: 144px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ffffff1a;
  background-color: #3c414c;

  padding: 8px;
  &:last-child {
    border-bottom: none;
  }

  &:hover { filter: brightness(1.1); }
  &:active {
    transition-duration: 0.1s;
    filter: brightness(1.2);
  }
`

const NoticeOptionText = styled.span`
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -1px;
`

const NoticeOptionIcon = styled.img`
  width: 16px;
  height: 16px;
`

const LoadingIcon = styled.img`
  animation: ${rotateAnimation} 4s cubic-bezier(.25,.51,.43,.7) infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 48px;
  height: 48px;
`

export { NoticeListContainer, NoticeItemContainer, NoticeWrapper, NoticeTitle, NoticeInfoWrapper, NoticeInfo, NoItemContainer, NoItemText, NoticeOptionButton, NoticeOptionWrapper, NoticeOptionItem, NoticeOptionText, NoticeOptionIcon, LoadingIcon };
