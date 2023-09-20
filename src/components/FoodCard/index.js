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
  transition: all 0.3s;
  position: absolute;
  top: 40px;
  right: 0px;
  width: max-content;

  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.mode === 'light' ?  '#ffffff' : '#1d2128' } ;

  z-index: 100;
  
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.boxShadow};

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
  background-color: ${(props) => props.theme.mode === 'light' ?  '#f6f7fb' : '#292c33' } ;
  border-radius: 8px;
  gap: 24px;
`

const NoMenuCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 12px;
  background-color: ${(props) => props.theme.mode === 'light' ?  '#f6f7fb' : '#292c33' } ;
  border-radius: 8px;
`

const NoMenuIcon = styled.img`
  width: 72px;
  height: 72px;
`

const NoMenuText = styled.span`
  color: ${(props) => props.theme.mode === 'light' ?  '#cecece' : '#a0a0a0' };
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
  transition: all 0.3s;
  cursor: pointer;
  opacity: ${(props) => (props.selected ? '1' : '0.25')};
  background-color: ${(props) => props.theme.mode === 'light' ?  '#ffffff' : '#1d2128' } ;
  border-radius: 8px;

  &:hover {
      filter: brightness(0.9);
  }
  &:active {
      filter: brightness(0.8);
  }
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

const FoodCard = ({ isShow, handleClose }) => {
  let date = new Date();
  let year = (date.getFullYear()).toString();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  let today = year + month + day;

  let hour = date.getHours();

  if( 10 <= hour && hour < 14 ) {
    hour = '1';
  } else if( 14 <= hour && hour <= 18 ) {
    hour = '2';
  } else {
    hour = '0';
  }

  let renderComponent;
  const [dayOfWeek, setDayOfWeek] = useState(date.getDay());
  const [foodInfo, setFoodInfo] = useState([]);
  const [selectedFoodDate, setSelectedFoodDate] = useState(today);
  const [selectedFoodTime, setSelectedFoodTime] = useState(hour);
  const [selectedFoodPlace, setSelectedFoodPlace] = useState('020');

  const changePrevDate = () => {
    let date = new Date(selectedFoodDate.substring(0, 4), selectedFoodDate.substring(4, 6) - 1, selectedFoodDate.substring(6, 8));
    date.setDate(date.getDate() - 1);
    let year = (date.getFullYear()).toString();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let prevDate = year + month + day;
    setDayOfWeek(date.getDay());
    setSelectedFoodDate(prevDate);
  };

  const changeNextDate = () => {
    let date = new Date(selectedFoodDate.substring(0, 4), selectedFoodDate.substring(4, 6) - 1, selectedFoodDate.substring(6, 8));
    date.setDate(date.getDate() + 1);
    let year = (date.getFullYear()).toString();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let nextDate = year + month + day;
    setDayOfWeek(date.getDay());
    setSelectedFoodDate(nextDate);
  };

  useEffect(() => {
    if (dayOfWeek == 0 || dayOfWeek == 6) {
      return;
    }
    else if (selectedFoodPlace == '030') return;
    axios.get('https://www.iflab.run/api/food/'+ selectedFoodPlace +'/' + selectedFoodDate)
      .then(response => {
        setFoodInfo(response.data);
      })
      .catch(error => {
        console.error('API 요청 중 오류 발생:');
      });
  }, [isShow, selectedFoodTime, selectedFoodPlace, selectedFoodDate]);

  if (dayOfWeek == 0 || dayOfWeek == 6) {
    renderComponent = (
      <MenuContainer>
        <InfoWrapper>
          <NoMenuCard>
            <NoMenuIcon src={noMenuIcon} />
            <NoMenuText> 주말에는 학식을 운영하지 않아요! </NoMenuText>
          </NoMenuCard>
        </InfoWrapper>
      </MenuContainer>
    );
  }
  else if (selectedFoodPlace == '020') {
    renderComponent = (
      <MenuContainer>
        {foodInfo[selectedFoodTime] && foodInfo[selectedFoodTime].wrap && foodInfo[selectedFoodTime].wrap.map((food, index) => (
          <InfoWrapper key={index}>
            <OpenTime time={food.time} />
            <MenuCard>
              {food.corner && food.corner.map((corner, index) => (
                <CornerWrapper key={index}>
                  {corner.id != ' ' && <CornerText>{corner.id}</CornerText>}
                  <MenuWrapper>
                    <MenuRow>
                      <MenuName name={corner.main} />
                      <MenuPrice price={corner.price} />
                    </MenuRow>
                    {corner.sub && corner.sub.split(" ").map(item => (
                      <MenuRow key={item}>
                          <MenuName name={item} type={'sub'} />
                          {corner.subprice ? <MenuPrice price={corner.subprice} type={'sub'} /> : null}
                      </MenuRow>
                    ))}
                  </MenuWrapper>
                </CornerWrapper>
              ))}
            </MenuCard>
          </InfoWrapper>
        ))}
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
                {food.sub && food.sub.split(" ").map(item => (
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
  }
  // 양식당 030
  else {
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
  return (
    <FoodCardContainer isshow={undefined ? undefined : isShow}>
      <FoodCardHeader>
        <TopBar handleClose={handleClose} />
        <Wrapper>
          <DateInputBox
            selectedFoodDate={selectedFoodDate}
            changePrevDate={changePrevDate}
            changeNextDate={changeNextDate}
          />
          {FoodTimeList.map((time) => (
            <TimeIcon
              key={time.id}
              className="icon time"
              src={time.icon}
              selected={selectedFoodTime === time.id}
              onClick={() => setSelectedFoodTime(time.id)}
            />
          ))}
        </Wrapper>
        <PlaceList
          selectedFoodPlace={selectedFoodPlace}
          onFoodPlaceClick={setSelectedFoodPlace}
        />
      </FoodCardHeader>
      {renderComponent}
    </FoodCardContainer>
  );
};


export default FoodCard;
