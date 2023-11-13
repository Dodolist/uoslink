import styled from 'styled-components';

const SettingCardContainer = styled('div')`
  transition: all 0.3s;
  position: absolute;
  top: 40px;
  right: 0px;
  min-width: 200px;
  min-height: 200px;

  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.mode === 'light' ?  '#ffffff' : '#000000' } ;

  z-index: 100;

  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.boxShadow};

  transform: ${(props) => (props.isshow ? 'translateY(0)' : 'translateY(-24px)')};
  transform-origin: top right;
  opacity: ${(props) => (props.isshow ? '1' : '0')};
  user-select: ${(props) => (props.isshow ? 'auto' : 'none')};
  pointer-events: ${(props) => (props.isshow ? 'auto' : 'none')};
  scale: ${(props) => (props.isshow ? '1' : '0.9')};
`

const SettingCardTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 12px 12px 12px;
  background-color: ${props => props.theme.background};
`

const CardTopBarLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
`
const CardTitle = styled.span`
  color: ${props => props.theme.titleText};
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.5px;
`

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
`

export { SettingCardContainer, SettingCardTopBar, CardTopBarLeft, CardTitle, SettingContainer };
