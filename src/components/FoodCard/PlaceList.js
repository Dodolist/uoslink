import React from 'react'
import styled, {css} from 'styled-components'

const FoodPlaceList = [
  {
    id: '020',
    name: '학생회관'
  },
  {
    id: '030',
    name: '양식당'
  },
  {
    id: '040',
    name: '자연과학관'
  },
  {
    id: '010',
    name: '본관8층'
  },
];

const PlaceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 8px;
  width: 100%;
`

const PlaceText = styled.span`
  transition: 0.2s;
  color: #606060;
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

const PlaceList = ({selectedFoodPlace, onFoodPlaceClick}) => {
  return (
    <PlaceWrapper>
      {FoodPlaceList.map((place) => (
        <PlaceText
          key={place.id}
          selected={selectedFoodPlace === place.id}
          onClick={() => onFoodPlaceClick(place.id)}
        >
          {place.name}
        </PlaceText>
      ))}
    </PlaceWrapper>
  );
};

export default PlaceList;
