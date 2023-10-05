import React from 'react'
import styled, {css} from 'styled-components'

const LibraryPlaceList = [
  {
    id: 'a',
    name: '중앙도서관'
  },
  {
    id: 'b',
    name: '경영경제전문도서관'
  },
  {
    id: 'c',
    name: '법학전문도서관'
  }
];

const PlaceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: ${(props) => props.theme.mode === 'light' ?  '#ffffff' : '#1d2128' } ;
  border-radius: 8px;
  width: 100%;
  gap: 8px;
`

const PlaceText = styled.span`
  transition: all 0.3s;
  color: ${(props) => props.theme.contentText};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  opacity: 0.5;
  letter-spacing: -0.5px;

  &:hover {
    opacity: 1;
  }
  ${(props) =>
    props.selected &&
    css`
    opacity: 1;
    font-weight: 700;
  `}
`

const PlaceList = ({selectedLibraryPlace, onLibraryPlaceClick}) => {
  return (
    <PlaceWrapper>
      {LibraryPlaceList.map((place) => (
        <PlaceText
          key={place.id}
          selected={selectedLibraryPlace === place.id}
          onClick={() => onLibraryPlaceClick(place.id)}
        >
          {place.name}
        </PlaceText>
      ))}
    </PlaceWrapper>
  );
};

export default PlaceList;
