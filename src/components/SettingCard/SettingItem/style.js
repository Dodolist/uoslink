import styled, { css } from 'styled-components';

const SettingItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const SettingItemTitle = styled.span`
  color: ${props => props.theme.contentText};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -1.5px;
  user-select: none;
  ${props => props.caution && css`
    color: #ff5a5a;
    cursor: pointer;
    &:hover {
      filter: brightness(0.9);
    }
    &:active {
      filter: brightness(0.8);
    }
  `}
`

export { SettingItemContainer, SettingItemTitle };
