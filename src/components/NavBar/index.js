import React from 'react';
import { NavBarContainer, Section, SectionIcon, SectionName, NavBarDivider, SearchButton, ButtonIcon, ButtonName, BookmarkIcon, NoticeFA1Icon, NoticeFA2Icon, NoticeDA1Icon, NoticeFA35Icon, NoticeSC1Icon, NoticeFA34Icon, SearchIcon } from './style';

const SectionList = [
  {
    id: 'FA1',
    icon: <NoticeFA1Icon />,
    name: '일반공지',
  },
  {
    id: 'FA2',
    icon: <NoticeFA2Icon />,
    name: '학사공지',
  },
  {
    id: 'DA1',
    icon: <NoticeDA1Icon />,
    name: '학과공지',
  },
  {
    id: 'FA35',
    icon: <NoticeFA35Icon />,
    name: '창업공지',
  },
  {
    id: 'SC1',
    icon: <NoticeSC1Icon />,
    name: '장학공지',
  },
  {
    id: 'FA34',
    icon: <NoticeFA34Icon />,
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
        <SectionIcon>
          <BookmarkIcon />
        </SectionIcon>
        <SectionName selected={'BM' === selectedSection}>
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
          <SectionIcon>
            {section.icon}
          </SectionIcon>
          <SectionName selected={
            section.id === selectedSection
            }>{section.name}</SectionName>
        </Section>
      ))}
      <SearchButton onClick={openSearchPage}>
        <ButtonIcon>
          <SearchIcon />
        </ButtonIcon>
        <ButtonName> 공지 검색 </ButtonName>
      </SearchButton>
    </NavBarContainer>
  );
};

export default NavBar;
