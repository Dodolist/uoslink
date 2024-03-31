import React, { useEffect, useState } from "react";
import { FoodCardContainer, FoodCardHeader, Wrapper, MenuContainer, InfoWrapper, MenuCard, NoMenuCard, NoMenuIcon, NoMenuText, CornerWrapper, CornerText, MenuWrapper, MenuRow, MenuIconName, TimeIcon, BreakfastIcon, LunchIcon, DinnerIcon } from "./style";
import axios from "axios";
import noMenuIcon from "../../images/no-menu-icon.svg";
import noMenu0031Icon from "../../images/no-menu-0031-icon.svg";
import noMenu0032Icon from "../../images/no-menu-0032-icon.svg";
import noMenu0033Icon from "../../images/no-menu-0033-icon.svg";
// import date1009Icon from '../../images/1009-icon.svg';
// import holidayIcon from '../../images/holiday-icon.svg';

import TopBar from "./TopBar.js";
import DateInputBox from "./DateInputBox.js";
import PlaceList from "./PlaceList.js";
import OpenTime from "./OpenTime.js";
import MenuPrice from "./MenuPrice.js";
import MenuName from "./MenuName.js";
import MenuIcon from "./MenuIcon.js";

const FoodTimeList = [
  {
    id: "0",
    icon: <BreakfastIcon />,
    name: "아침",
  },
  {
    id: "1",
    icon: <LunchIcon />,
    name: "점심",
  },
  {
    id: "2",
    icon: <DinnerIcon />,
    name: "저녁",
  },
];

const FoodCard = ({ openedCardName, handleClose }) => {
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let today = year + month + day;

  let hour = date.getHours();

  if (10 <= hour && hour < 14) {
    hour = "1";
  } else if (14 <= hour) {
    hour = "2";
  } else {
    hour = "0";
  }

  const [renderComponent, setRenderComponent] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState(date.getDay());
  const [foodInfo, setFoodInfo] = useState([]);
  const [selectedFoodDate, setSelectedFoodDate] = useState(today);
  const [selectedFoodTime, setSelectedFoodTime] = useState(hour);
  const [selectedFoodPlace, setSelectedFoodPlace] = useState("020");

  const changePrevDate = () => {
    let date = new Date(
      selectedFoodDate.substring(0, 4),
      selectedFoodDate.substring(4, 6) - 1,
      selectedFoodDate.substring(6, 8)
    );
    date.setDate(date.getDate() - 1);
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    let prevDate = year + month + day;
    setDayOfWeek(date.getDay());
    setSelectedFoodDate(prevDate);
  };

  const changeNextDate = () => {
    let date = new Date(
      selectedFoodDate.substring(0, 4),
      selectedFoodDate.substring(4, 6) - 1,
      selectedFoodDate.substring(6, 8)
    );
    date.setDate(date.getDate() + 1);
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    let nextDate = year + month + day;
    setDayOfWeek(date.getDay());
    setSelectedFoodDate(nextDate);
  };

  useEffect(() => {
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      changeRenderComponent();
      return;
    }
    axios
      .get(
        "https://www.iflab.run/api/food/" +
          selectedFoodPlace +
          "/" +
          selectedFoodDate
      )
      .then((response) => {
        setFoodInfo(response.data);
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:");
      });
  }, [openedCardName, selectedFoodTime, selectedFoodPlace, selectedFoodDate]);

  useEffect(() => {
    changeRenderComponent();
  }, [foodInfo]);

  function changeRenderComponent() {
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setRenderComponent(
        <MenuContainer>
          <InfoWrapper isShow={openedCardName === "food"} delay={0.1}>
            <NoMenuCard>
              <NoMenuIcon src={noMenuIcon} />
              <NoMenuText> 주말에는 학식을 운영하지 않아요! </NoMenuText>
            </NoMenuCard>
          </InfoWrapper>
        </MenuContainer>
      );
    } else if (selectedFoodPlace === "020") {
      setRenderComponent(
        <MenuContainer>
          {foodInfo[selectedFoodTime] &&
            foodInfo[selectedFoodTime].wrap &&
            foodInfo[selectedFoodTime].wrap.map((food, index) => (
              <InfoWrapper
                key={index}
                isShow={openedCardName === "food"}
                delay={0.1 * (((index * 2) % 10) + 1)}
              >
                <OpenTime time={food.time} />
                <MenuCard>
                  {food.corner &&
                    food.corner.map((corner, index) => (
                      <CornerWrapper key={index}>
                        {corner.id !== " " && (
                          <CornerText>{corner.id}</CornerText>
                        )}
                        <MenuWrapper>
                          <MenuRow>
                            <MenuName name={corner.main} />
                            <MenuPrice price={corner.price} />
                          </MenuRow>
                          {corner.sub &&
                            corner.sub.split(" ").map((item) => (
                              <MenuRow key={item}>
                                <MenuName name={item} type={"sub"} />
                                {corner.subprice ? (
                                  <MenuPrice
                                    price={corner.subprice}
                                    type={"sub"}
                                  />
                                ) : null}
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
    else if (selectedFoodPlace === "040" || selectedFoodPlace === "010") {
      setRenderComponent(
        <MenuContainer>
          {foodInfo[selectedFoodTime] &&
          foodInfo[selectedFoodTime].wrap &&
          foodInfo[selectedFoodTime].wrap.length > 0 ? (
            foodInfo[selectedFoodTime].wrap.map((food, index) => (
              <InfoWrapper
                key={index}
                isShow={openedCardName === "food"}
                delay={0.1}
              >
                <OpenTime time={food.time} />
                <MenuCard>
                  <MenuWrapper>
                    <MenuRow>
                      <MenuName name={food.main} />
                      <MenuPrice price={food.price} />
                    </MenuRow>
                    {food.sub &&
                      food.sub.split(" ").map((item) => (
                        <MenuRow key={item}>
                          <MenuName name={item} type={"sub"} />
                        </MenuRow>
                      ))}
                  </MenuWrapper>
                </MenuCard>
              </InfoWrapper>
            ))
          ) : (
            <InfoWrapper isShow={openedCardName === "food"} delay={0.1}>
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
    else if (selectedFoodPlace === "030") {
      const icons = [noMenu0031Icon, noMenu0032Icon, noMenu0033Icon];
      const randomIndex = Math.floor(Math.random() * icons.length);
      const selectedIcon = icons[randomIndex];
      setRenderComponent(
        <MenuContainer>
          {foodInfo[selectedFoodTime] &&
          foodInfo[selectedFoodTime].wrap &&
          foodInfo[selectedFoodTime].wrap.length > 0 ? (
            foodInfo[selectedFoodTime].wrap.map((food, index) => (
              <InfoWrapper
                key={index}
                isShow={openedCardName === "food"}
                delay={0.1 * (((index * 2) % 10) + 1)}
              >
                <OpenTime time={food.time} />
                <MenuCard>
                  {food.corner &&
                    food.corner.map((corner, index) => (
                      <CornerWrapper key={index}>
                        <MenuWrapper>
                          <MenuRow>
                            <MenuIconName>
                              <MenuIcon type={corner.id} />
                              <MenuName name={corner.main} />
                            </MenuIconName>
                          </MenuRow>
                          {corner.sub &&
                            corner.sub.split(" ").map((item, index) => (
                              <MenuRow key={item}>
                                <MenuName name={item} type={"sub"} />
                                {corner.subprice ? (
                                  <MenuPrice
                                    price={corner.subprice.split(" ")[index]}
                                    type={"sub"}
                                  />
                                ) : null}
                              </MenuRow>
                            ))}
                        </MenuWrapper>
                      </CornerWrapper>
                    ))}
                </MenuCard>
              </InfoWrapper>
            ))
          ) : (
            <InfoWrapper isShow={openedCardName === "food"} delay={0.1}>
              <NoMenuCard>
                <NoMenuIcon src={selectedIcon} />
                <NoMenuText> 아느칸은 점심에만 학식을 운영해요! </NoMenuText>
              </NoMenuCard>
            </InfoWrapper>
          )}
        </MenuContainer>
      );
    }
  }
  return (
    <FoodCardContainer isshow={openedCardName === "food"}>
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
              selected={selectedFoodTime === time.id}
              onClick={() => setSelectedFoodTime(time.id)}
            >
              {time.icon}
            </TimeIcon>
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

export default React.memo(FoodCard, (prevProps, nextProps) => {
  return (
    prevProps.openedCardName !== "food" && nextProps.openedCardName !== "food"
  );
});
