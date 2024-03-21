import React from 'react';
import { NavBarContainer, Section, SectionIcon, SectionName, NavBarDivider, SearchButton, ButtonIcon, ButtonName } from './style';
import bookmarkIcon from '../../images/bookmark-icon.svg';
import noticeFA1Icon from '../../images/notice-FA1-icon.svg';
import noticeFA2Icon from '../../images/notice-FA2-icon.svg';
import noticeFA35Icon from '../../images/notice-FA35-icon.svg';
import noticeDA1Icon from '../../images/notice-DA1-icon.svg';
import noticeSC1Icon from '../../images/notice-SC1-icon.svg';
import noticeFA34Icon from '../../images/notice-FA34-icon.svg';
import searchIcon from '../../images/search-icon.svg';

const SectionList = [
  {
    id: 'FA1',
    icon: noticeFA1Icon,
    name: '일반공지',
  },
  {
    id: 'FA2',
    icon: noticeFA2Icon,
    name: '학사공지',
  },
  {
    id: 'DA1',
    icon: noticeDA1Icon,
    name: '학과공지',
  },
  {
    id: 'FA35',
    icon: noticeFA35Icon,
    name: '창업공지',
  },
  {
    id: 'SC1',
    icon: noticeSC1Icon,
    name: '장학공지',
  },
  {
    id: 'FA34',
    icon: noticeFA34Icon,
    name: '직원채용',
  },
];

const NavBar = ({onSectionClick, selectedSection, openSearchPage}) => {

  return (
    <NavBarContainer>
      <Section
        onClick={() => {
          onSectionClick('BM');
        }}
      >
        <SectionIcon src={bookmarkIcon} />
        <SectionName
          selected={'BM' === selectedSection}
        >
        내 북마크
        </SectionName>
      </Section>
      <NavBarDivider />
      {SectionList.map((section) => (
        <Section
          key={section.id}
          onClick={() => {
            onSectionClick(section.id);
          }}
        >
          <SectionIcon src={section.icon} />
          <SectionName selected={
            section.id === selectedSection
            }>{section.name}</SectionName>
        </Section>
      ))}
      <SearchButton onClick={openSearchPage}>
        <ButtonIcon src={searchIcon} />
        <ButtonName> 공지 검색 </ButtonName>
      </SearchButton>
    </NavBarContainer>
  );
};

export default NavBar;
