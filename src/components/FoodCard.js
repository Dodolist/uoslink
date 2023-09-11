import styled, { css } from 'styled-components';
import foodIcon from '../images/white-food-icon.svg';
import closeIcon from '../images/white-close-icon.svg';
import leftArrowIcon from '../images/left-arrow-icon.svg';
import rightArrowIcon from '../images/right-arrow-icon.svg';
import breakfastIcon from '../images/breakfast-icon.svg';
import lunchIcon from '../images/lunch-icon.svg';
import dinnerIcon from '../images/dinner-icon.svg';
import clockIcon from '../images/clock-icon.svg';

const FoodCardContainer = styled.div`
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
`

const FoodCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  background-color: #408cff;
  border-radius: 0 0 16px 16px;
  gap: 16px;
`

const FoodCardTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`

const CardTopBarLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
`

const CardTitle = styled.span`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.5px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 8px;
  flex-grow: 1;
  gap: 12px;
`

const DateText = styled.span`
  color: #a0a0a0;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.5px;
`

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

  &:first-child {
    opacity: 1;
  }
  &:hover {
    opacity: 1;
  }
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 16px;
`
const OpenWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  align-self: flex-end;
  gap: 4px;
  margin: 0 4px 4px 0;
`
const OpenText = styled.span`
  color: #a0a0a0;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.5px;
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

const MenuMainNameText = styled.span`
  color: #606060;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -2px;
`

const MenuMainPriceText = styled.span`
  color: #606060;
  font-size: 12px;
  letter-spacing: -0.5px;
`

const MenuSubNameText = styled.span`
  color: #a0a0a0;
  font-size: 12px;
  letter-spacing: -0.5px;
`

const MenuSubPriceText = styled.span`
  color: #cecece;
  font-size: 10px;
  letter-spacing: -0.5px;
`


const FoodCard = () => {
  return (
    <FoodCardContainer>
      <FoodCardHeader>
        <FoodCardTopBar>
          <CardTopBarLeft>
            <img src={foodIcon} />
            <CardTitle>학식</CardTitle>
          </CardTopBarLeft>
          <img className="icon" src={closeIcon} />
        </FoodCardTopBar>
        <Wrapper>
          <DateWrapper>
            <img className="icon" src={leftArrowIcon} />
            <DateText>09.01 (수)</DateText>
            <img className="icon" src={rightArrowIcon} />
          </DateWrapper>
          <img className="icon" src={breakfastIcon} />
          <img className="icon" src={lunchIcon} />
          <img className="icon" src={dinnerIcon} />
        </Wrapper>
        <Wrapper>
          <PlaceWrapper>
            <PlaceText>학생회관</PlaceText>
            <PlaceText>양식당</PlaceText>
            <PlaceText>자연과학관</PlaceText>
            <PlaceText>본관8층</PlaceText>
          </PlaceWrapper>
        </Wrapper>
      </FoodCardHeader>
      <MenuContainer>
        <InfoWrapper>
          <OpenWrapper>
            <img src={clockIcon} />
            <OpenText>11:00 ~ 14:00</OpenText>
          </OpenWrapper>
          <MenuCard>
            <CornerWrapper>
              <CornerText>A</CornerText>
              <MenuWrapper>
                <MenuRow>
                  <MenuMainNameText>라면</MenuMainNameText>
                  <MenuMainPriceText>2,000원</MenuMainPriceText>
                </MenuRow>
                <MenuRow>
                  <MenuSubNameText>치즈, 떡, 만두, 공기밥</MenuSubNameText>
                  <MenuSubPriceText>+ 500원</MenuSubPriceText>
                </MenuRow>
              </MenuWrapper>
            </CornerWrapper>
            <CornerWrapper>
              <CornerText>B</CornerText>
              <MenuWrapper>
                <MenuRow>
                  <MenuMainNameText>덮밥</MenuMainNameText>
                  <MenuMainPriceText>3,800원</MenuMainPriceText>
                </MenuRow>
                <MenuRow>
                  <MenuSubNameText>참치마요덮밥</MenuSubNameText>
                </MenuRow>
                <MenuRow>
                  <MenuSubNameText>스팸마요덮밥</MenuSubNameText>
                </MenuRow>
                <MenuRow>
                  <MenuSubNameText>치킨마요덮밥</MenuSubNameText>
                </MenuRow>
              </MenuWrapper>
            </CornerWrapper>
            <CornerWrapper>
              <CornerText>C</CornerText>
              <MenuWrapper>
                <MenuRow>
                  <MenuMainNameText>사골떡국</MenuMainNameText>
                  <MenuMainPriceText>3,800원</MenuMainPriceText>
                </MenuRow>
                <MenuRow>
                  <MenuMainNameText>매콤콩나물불고기</MenuMainNameText>
                  <MenuMainPriceText>3,800원</MenuMainPriceText>
                </MenuRow>
              </MenuWrapper>
            </CornerWrapper>
            <CornerWrapper>
              <CornerText>Self</CornerText>
              <MenuWrapper>
                <MenuRow>
                  <MenuSubNameText>장국, 콩나물무침, 맛김치</MenuSubNameText>
                </MenuRow>
              </MenuWrapper>
            </CornerWrapper>
          </MenuCard>
        </InfoWrapper>
        <InfoWrapper>
          <OpenWrapper>
            <img src={clockIcon} />
            <OpenText>11:00 ~ 13:30</OpenText>
          </OpenWrapper>
          <MenuCard>
            <CornerWrapper>
              <CornerText>E</CornerText>
              <MenuWrapper>
                <MenuRow>
                  <MenuMainNameText>참치김치찌개</MenuMainNameText>
                  <MenuMainPriceText>5,000원</MenuMainPriceText>
                </MenuRow>
                <MenuRow>
                  <MenuSubNameText>새우볼튀김</MenuSubNameText>
                </MenuRow>
                <MenuRow>
                  <MenuSubNameText>숙주오이무침</MenuSubNameText>
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
