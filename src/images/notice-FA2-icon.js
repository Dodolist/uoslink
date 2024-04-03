import styled from 'styled-components';
import { ReactComponent as NoticeFA2IconSVG } from './notice-FA2-icon.svg';

const NoticeFA2Icon = styled(NoticeFA2IconSVG)`
  width: 100%;
  height: 100%;
  path:first-child {
    fill: ${(props) => props.theme.primary};
  }
  path:last-child {
    fill: ${(props) => props.theme.secondary};
  }
`;

export default NoticeFA2Icon;
