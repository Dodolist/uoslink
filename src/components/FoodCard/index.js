import React, { useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import breakfastIcon from '../../images/breakfast-icon.svg';
import lunchIcon from '../../images/lunch-icon.svg';
import dinnerIcon from '../../images/dinner-icon.svg';

import TopBar from './TopBar.js';
import DateInputBox from './DateInputBox.js';
import PlaceList from './PlaceList.js';
import OpenTime from './OpenTime.js';
import MenuPrice from './MenuPrice.js';
import MenuName from './MenuName.js';

const FoodCardContainer = styled('div')`
  transition: all 0.5s;
  position: fixed;
  top: 60px;
  right: 80px;

  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  z-index: 100;
  
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 24px 0px #cecece;

  transform: ${(props) => (props.isshow ? 'translateY(0)' : 'translateY(-24px)')};
  opacity: ${(props) => (props.isshow ? '1' : '0')};
  user-select: ${(props) => (props.isshow ? 'auto' : 'none')};
  pointer-events: ${(props) => (props.isshow ? 'auto' : 'none')};
`

const FoodCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  background-color: #408cff;
  border-radius: 0 0 16px 16px;
  gap: 16px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 16px;
`
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const MenuCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: #f6f7fb;
  border-radius: 8px;
  gap: 24px;
`

const CornerWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const CornerText = styled.span`
  color: #408cff;
  font-size: 12px;
  font-weight: bold;
  margin: 2px 8px 0 0;
`

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`

const MenuRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const TimeIcon = styled.img`
  transition: all 0.2s;
  cursor: pointer;
  opacity: 0.25;

  &:hover {
      filter: brightness(0.9);
  }
  &:active {
      filter: brightness(0.8);
  }
  ${(props) =>
    props.selected &&
    css`
    opacity: 1;
  `}
`

const FoodTimeList = [
  {
    id: 'breakfast',
    icon: breakfastIcon,
    name: '아침'
  },
  {
    id: 'lunch',
    icon: lunchIcon,
    name: '점심'
  },
  {
    id: 'dinner',
    icon: dinnerIcon,
    name: '저녁'
  }
];

const FoodMenuList = [
  {
    id: 'breakfast',
    wrap: [
      {
        time: '08:00 ~ 10:00',
        corner: [
          {
            id: ' ',
            mainMenu: ['계란볶음밥'],
            subMenu: ['자장소스', '순두부닭', '김치'],
            mainPrice: '1,000원'
          }
        ]
      }
    ]
  },
  {
    id: 'lunch',
    wrap: [
      {
        time: '11:00 ~ 14:00',
        corner: [
          {
            id: 'A',
            mainMenu: ['라면'],
            mainPrice: '2,000원',
            subMenu: ['치즈 / 떡 / 만두 / 공기밥'],
            subPrice: '500원',
          },
          {
            id: 'B',
            mainMenu: ['덮밥'],
            mainPrice: '3,800원',
            subMenu: ['참치마요덮밥', '스팸마요덮밥', '치킨마요덮밥'],
          },
          {
            id: 'C',
            mainMenu: ['사골떡국', '매콤콩나물불고기'],
            mainPrice: '3,800원',
          },
          {
            id: 'Self',
            subMenu: ['장국 / 콩나물무침 / 맛김치']
          }
        ]
      },
      {
        time: '11:00 ~ 13:30',
        corner: [
          {
            id: 'E',
            mainMenu: ['떡볶이'],
            mainPrice: '5,000원',
            subMenu: ['치즈', '참치마요', '스팸마요', '치킨마요'],
          }
        ],
      },
    ],
  },
  {
    id: 'dinner',
    wrap: [
      {
        time: '17:00 ~ 18:30',
        corner: [
          {
            id: 'B',
            mainMenu: ['덮밥'],
            mainPrice: '3,800원',
            subMenu: ['참치마요덮밥', '스팸마요덮밥', '치킨마요덮밥'],
          },
          {
            id: 'C',
            mainMenu: ['사골떡국', '매콤콩나물불고기'],
            mainPrice: '3,800원',
          },
          {
            id: 'E',
            mainMenu: ['떡볶이'],
            mainPrice: '5,000원',
            subMenu: ['치즈', '참치마요', '스팸마요', '치킨마요'],
          },
          {
            id: 'Self',
            subMenu: ['장국 / 콩나물무침 / 맛김치']
          }
        ],
      },
    ],
  }
];

const FoodCard = ({ isShow, onFoodTimeClick, selectedFoodTime, onFoodPlaceClick, selectedFoodPlace }) => {
  /*
  useEffect(() => {
    let url = 'https://www.iflab.run/api/food';
    axios.get(url)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('API 요청 중 오류 발생:');
      });
  }, []);
  */
  return (
    <FoodCardContainer isshow={undefined ? undefined : isShow}>
      <FoodCardHeader>
        <TopBar />
        <Wrapper>
          <DateInputBox />
          {FoodTimeList.map((time) => (
            <TimeIcon
              key={time.id}
              className="icon time"
              src={time.icon}
              selected={selectedFoodTime === time.id}
              onClick={() => onFoodTimeClick(time.id)}
            />
          ))}
        </Wrapper>
        <PlaceList
          selectedFoodPlace={selectedFoodPlace}
          onFoodPlaceClick={onFoodPlaceClick}
        />
      </FoodCardHeader>
      <MenuContainer>
        <InfoWrapper>
          <OpenTime time={'11:00 ~ 14:00'} />
          <MenuCard>
            <CornerWrapper>
              <CornerText>A</CornerText>
              <MenuWrapper>
                <MenuRow>
                  <MenuName name={'라면'} />
                  <MenuPrice price={'2,000원'} />
                </MenuRow>
                <MenuRow>
                  <MenuName name={'치즈, 떡, 만두, 공기밥'} type={'sub'} />
                  <MenuPrice price={'+ 500원'} type={'sub'} />
                </MenuRow>
              </MenuWrapper>
            </CornerWrapper>
            <CornerWrapper>
              <CornerText>B</CornerText>
              <MenuWrapper>
                <MenuRow>
                  <MenuName name={'덮밥'} />
                  <MenuPrice price={'3,800원'} />
                </MenuRow>
                <MenuRow>
                  <MenuName name={'참치마요덮밥'} type={'sub'} />
                </MenuRow>
                <MenuRow>
                  <MenuName name={'스팸마요덮밥'} type={'sub'} />
                </MenuRow>
                <MenuRow>
                  <MenuName name={'치킨마요덮밥'} type={'sub'} />
                </MenuRow>
              </MenuWrapper>
            </CornerWrapper>
            <CornerWrapper>
              <CornerText>C</CornerText>
              <MenuWrapper>
                <MenuRow>
                  <MenuName name={'사골떡국'} />
                  <MenuPrice price={'3,800원'} />
                </MenuRow>
                <MenuRow>
                  <MenuName name={'매콤콩나물불고기'} />
                  <MenuPrice price={'3,800원'} />
                </MenuRow>
              </MenuWrapper>
            </CornerWrapper>
            <CornerWrapper>
              <CornerText>Self</CornerText>
              <MenuWrapper>
                <MenuRow>
                  <MenuName name={'장국, 콩나물무침, 맛김치'} type={'sub'} />
                </MenuRow>
              </MenuWrapper>
            </CornerWrapper>
          </MenuCard>
        </InfoWrapper>
        <InfoWrapper>
          <OpenTime time={'11:00 ~ 13:30'} />
          <MenuCard>
            <CornerWrapper>
              <CornerText>E</CornerText>
              <MenuWrapper>
                <MenuRow>
                  <MenuName name={'참치김치찌개'} />
                  <MenuPrice price={'5,000원'} />
                </MenuRow>
                <MenuRow>
                  <MenuName name={'새우볼튀김'} type={'sub'} />
                </MenuRow>
                <MenuRow>
                  <MenuName name={'숙주오이무침'} type={'sub'} />
                </MenuRow>
              </MenuWrapper>
            </CornerWrapper>
          </MenuCard>
        </InfoWrapper>
      </MenuContainer>
    </FoodCardContainer>
  );
};


export default FoodCard;
