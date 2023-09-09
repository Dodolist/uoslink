import styled from 'styled-components';
import noticeFA1Icon from '../images/notice-FA1-icon.svg';
import noticeFA2Icon from '../images/notice-FA2-icon.svg';
import noticeFA35Icon from '../images/notice-FA35-icon.svg';
import noticeSC1Icon from '../images/notice-SC1-icon.svg';
import noticeFA34Icon from '../images/notice-FA34-icon.svg';

const NavBar = () => {
  return (
    <NavBarContainer>
      <Section>
        <SectionIcon src={noticeFA1Icon} />
        <SectionName>일반공지</SectionName>
      </Section>
      <Section>
        <SectionIcon src={noticeFA2Icon} />
        <SectionName>학사공지</SectionName>
      </Section>
      <Section>
        <SectionIcon src={noticeFA35Icon} />
        <SectionName>창업공지</SectionName>
      </Section>
      <Section>
        <SectionIcon src={noticeSC1Icon} />
        <SectionName>장학공지</SectionName>
      </Section>
      <Section>
        <SectionIcon src={noticeFA34Icon} />
        <SectionName>직원채용</SectionName>
      </Section>
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  border-radius: 8px;
  gap: 16px;
  background-color: #f0f1f5;
  min-width: 160px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  opacity: 0.5;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
  &:first-child {
    opacity: 1;
  }
`;

const SectionIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SectionName = styled.span`
  color: #5c5e66;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
`;
