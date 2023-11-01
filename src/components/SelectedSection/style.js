import styled, { css, keyframes } from 'styled-components';

const SelectedSectionDisappearAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-15%);
  }
`

const SelectedSectionAppearAnimation = keyframes`
  0%{ 
    opacity: 0;
    transform: translateX(15%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`

const SelectedSectionContainer = styled.div`
  position: relative;
  height: 100%;
  flex-grow: 1;
`

const SelectedSectionWrap = styled.div`
  transition: all 0s;
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${(props) => props.isDisappear && css`
    animation: ${SelectedSectionDisappearAnimation} 0.3s ease-in-out forwards;
    &:last-child {
      animation: ${SelectedSectionAppearAnimation} 0.3s ease-in-out forwards;
    };
  `};
`;

const SelectedSectionIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const SelectedSectionName = styled.span`
  color: ${(props) => props.theme.titleText};
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -2px;
`;

export { SelectedSectionContainer, SelectedSectionWrap, SelectedSectionIcon, SelectedSectionName };
