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

const ArticleListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  // height: 50%;
  overflow: hidden;
  min-height: 50%;
  background-color: ${props => props.theme.foreground}f4;
  border-radius: 8px;
  padding: 8px;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
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

const ArticleItemContainer = styled.div`
  position: relative;
  animation: ${showListAnimation} 0.5s ease-in-out forwards;
  opacity: 0;

  display: flex;
  flex-direction: column;
  padding: 4px;
  border-radius: 8px;

  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${props => props.theme.foreground};
    filter: brightness(0.9);
  }
  &:active {
    transition: all 0.05s;
    filter: brightness(0.8);
  }
`

const ArticleWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  ${props => props.alreadyRead && css`
    filter: opacity(0.5);
    &:hover {
      filter: opacity(0.5) brightness(0.9);
    }
    &:active {
      transition: all 0.05s;
      filter: opacity(0.5) brightness(0.8);
    }
  `}
`;

const ArticleInfoWrapper = styled.div`
  width: calc(100% - 12px);
  display: flex;
  flex-direction: column;
`

const ArticleRank = styled.div`
  color: ${props => props.theme.primary};
  font-size: 10px;
  font-weight: 500;
`

const ArticleInfo = styled.div`
  color: ${props => props.theme.subText};
  font-size: 10px;
`

const ArticleTitle = styled.div`
  color: ${props => props.theme.contentText};
  font-size: 12px;
  font-weight: 500;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ListName = styled.div`
  animation: ${showListAnimation} 0.5s ease-in-out forwards;
  color: ${props => props.theme.contentText};
  font-size: 16px;
  font-weight: bold;
  margin: 4px 0 8px 8px;
  opacity: 0;
`
export { ArticleListContainer, LoadingIcon, ArticleItemContainer, ArticleWrapper, ArticleInfoWrapper, ArticleRank, ArticleInfo, ArticleTitle, ListName };
