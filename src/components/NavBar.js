import React, { useState } from 'react';
import styled, { css }from 'styled-components';
import noticeFA1Icon from '../images/notice-FA1-icon.svg';
import noticeFA2Icon from '../images/notice-FA2-icon.svg';
import noticeFA35Icon from '../images/notice-FA35-icon.svg';
import noticeSC1Icon from '../images/notice-SC1-icon.svg';
import noticeFA34Icon from '../images/notice-FA34-icon.svg';


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


const NavBar = () => {
  const [selectedSection, setSelectedSection] = useState('FA1');

  const changeSection = (id) => {
    setSelectedSection(id);
  };

  return (
    <NavBarContainer>
      {SectionList.map((section) => (
        <Section key={section.id}
          selected={section.id === selectedSection}
          className={section.id === selectedSection ? 'selected' : ''}
          onClick={() => {
            changeSection(section.id);
          }}>
          <SectionIcon src={section.icon} />
          <SectionName selected={
            section.id === selectedSection
            }>{section.name}</SectionName>
        </Section>
      ))}
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

  cursor: pointer;
`;

const SectionIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SectionName = styled.span`
  transition: all 0.2s ease-in-out;
  color: #5c5e66;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
  opacity: 0.5;

  ${(props) =>
    props.selected &&
    css`
    opacity: 1;
    font-weight: 700;
  `}

  &:hover {
    opacity: 1;
  }
`;
