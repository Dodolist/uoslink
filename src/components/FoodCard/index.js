import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import breakfastIcon from '../../images/breakfast-icon.svg';
import lunchIcon from '../../images/lunch-icon.svg';
import dinnerIcon from '../../images/dinner-icon.svg';
import roadworkIcon from '../../images/roadwork-icon.svg';
import noMenuIcon from '../../images/no-menu-icon.svg';

import TopBar from './TopBar.js';
import DateInputBox from './DateInputBox.js';
import PlaceList from './PlaceList.js';
import OpenTime from './OpenTime.js';
import MenuPrice from './MenuPrice.js';
import MenuName from './MenuName.js';

const FoodCardContainer = styled('div')`
  transition: all 0.5s;
  position: absolute;
  top: 40px;
  right: 0px;
  width: max-content;

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

const NoMenuCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 12px;
  background-color: #f6f7fb;
  border-radius: 8px;
`

const NoMenuIcon = styled.img`
  width: 72px;
  height: 72px;
`

const NoMenuText = styled.span`
  color: #cecece;
  font-size: ${(props) => (props.size == 'small' ? '14px' : '16px')};
  font-weight: bold;
  letter-spacing: -0.5px;
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
    id: '0',
    icon: breakfastIcon,
    name: '아침'
  },
  {
    id: '1',
    icon: lunchIcon,
    name: '점심'
  },
  {
    id: '2',
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

const FoodCard = ({ isShow, onFoodTimeClick, selectedFoodTime, onFoodPlaceClick, selectedFoodPlace, handleClose }) => {
  let renderComponent;

  const [foodInfo, setFoodInfo] = useState([]);
  var nowMenu;
  var nowTime;
  var nowMainMenu;
  var nowSubMenu;
  var nowPrice;

  useEffect(() => {
    if (selectedFoodPlace == '030') return;
    axios.get('https://www.iflab.run/api/food/'+ selectedFoodPlace +'/20230915')
      .then(response => {
        console.log(response.data);
        setFoodInfo(response.data);
      })
      .catch(error => {
        console.error('API 요청 중 오류 발생:');
      });
  }, [isShow, selectedFoodTime, selectedFoodPlace]);


  // 양식당 030
  if (selectedFoodPlace == '030') {
    renderComponent = (
      <MenuContainer>
        <InfoWrapper>
          <NoMenuCard>
            <NoMenuIcon src={roadworkIcon} />
            <NoMenuText>임시 휴업중입니다</NoMenuText>
            <NoMenuText size={'small'}>9월 중 재개 예정</NoMenuText>
          </NoMenuCard>
        </InfoWrapper>
      </MenuContainer>
    );
  }
  // 자연과학관 040, 본관8층 010
  else if (selectedFoodPlace == '040' || selectedFoodPlace == '010') {
    renderComponent = (
      <MenuContainer>
        {foodInfo[selectedFoodTime] && foodInfo[selectedFoodTime].wrap && foodInfo[selectedFoodTime].wrap.length > 0 ? (foodInfo[selectedFoodTime].wrap.map((food, index) => (
        <InfoWrapper key={index}>
            <OpenTime time={food.time} />
            <MenuCard>
              <MenuWrapper>
                <MenuRow>
                  <MenuName name={food.main} />
                  <MenuPrice price={food.price} />
                </MenuRow>
                {food.sub.split(" ").map(item => (
                  <MenuRow key={item}>
                      <MenuName name={item} type={'sub'} />
                  </MenuRow>
                ))}
              </MenuWrapper>
            </MenuCard>
        </InfoWrapper>
        ))
      ) : (
        <InfoWrapper>
          <NoMenuCard>
            <NoMenuIcon src={noMenuIcon} />
            <NoMenuText> 아침에는 학식을 운영하지 않아요! </NoMenuText>
          </NoMenuCard>
        </InfoWrapper>
      )}
      </MenuContainer>
    );
  } else {
    renderComponent = (
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
    );
  }

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
        <TopBar handleClose={handleClose} />
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
      {renderComponent}
    </FoodCardContainer>
  );
};


export default FoodCard;
