import React from 'react';
import { NavBarContainer, Section, SectionIcon, SectionName, NavBarDivider, SearchButton, ButtonIcon, ButtonName } from './style';
import BookmarkIcon from "../../images/bookmark-icon";
import NoticeFA1Icon from "../../images/notice-FA1-icon";
import NoticeFA2Icon from "../../images/notice-FA2-icon";
import NoticeFA35Icon from "../../images/notice-FA35-icon";
import NoticeDA1Icon from "../../images/notice-DA1-icon";
import NoticeSC1Icon from "../../images/notice-SC1-icon";
import NoticeFA34Icon from "../../images/notice-FA34-icon";
import SearchIcon from "../../images/search-icon";

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
