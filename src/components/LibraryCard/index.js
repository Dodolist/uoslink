import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "./TopBar.js";
import MainInfo from "./MainInfo.js";
import SubInfo from "./SubInfo.js";
import PlaceList from "./PlaceList.js";
import { LibraryCardContainer, LibraryCardHeader, PlaceContainer, InfoWrapper } from "./style";

const LibaryCard = ({ openedCardName, handleClose }) => {
  const [libraryInfo, setLibraryInfo] = useState([]);
  const [selectedLibraryPlace, setSelectedLibraryPlace] = useState("a");
  const initialDashValues = [44, 44, 44, 44];
  const [dashValues, setDashValues] = useState(initialDashValues);
  const initialLinearDashValues = [0, 0, 0];
  const [linearDashValues, setLinearDashValues] = useState(
    initialLinearDashValues
  );

  useEffect(() => {
    axios
      .get("https://www.iflab.run/api/scraping/library/" + selectedLibraryPlace)
      .then((response) => {
        setLibraryInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [openedCardName, selectedLibraryPlace]);

  useEffect(() => {
    if (openedCardName) {
      let newDashValues;
      let newLinearDashValues;

      if (selectedLibraryPlace === "a") {
        newDashValues = libraryInfo.slice(0, 4).map((item) => {
          return 44 * (1 - item.use_rate / 100);
        });
        newLinearDashValues = libraryInfo.slice(4, 7).map((item) => {
          return item.use_rate;
        });
      } else {
        newDashValues = libraryInfo
          .slice(0, 2)
          .map((item) => {
            return 44 * (1 - item.use_rate / 100);
          })
          .concat([44, 44]);
        newLinearDashValues = initialLinearDashValues;
      }
      setDashValues(newDashValues);
      setLinearDashValues(newLinearDashValues);
    }
  }, [openedCardName, selectedLibraryPlace, libraryInfo]);

  return (
    <LibraryCardContainer isshow={openedCardName === "library"}>
      <LibraryCardHeader>
        <TopBar handleClose={handleClose} />
        <PlaceList
          selectedLibraryPlace={selectedLibraryPlace}
          onLibraryPlaceClick={setSelectedLibraryPlace}
        />
      </LibraryCardHeader>
      <PlaceContainer>
        <InfoWrapper>
          {libraryInfo.slice(0, 2).map((item, index) => (
            <MainInfo
              key={index}
              item={item}
              isShow={openedCardName === "library"}
              delay={0.1}
              dashOffset={dashValues[index]}
              dashColor={
                dashValues[index] <= 11
                  ? "red"
                  : dashValues[index] <= 33
                  ? "yellow"
                  : null
              }
            />
          ))}
        </InfoWrapper>
        {selectedLibraryPlace === "a" && libraryInfo.length > 4 && (
          <InfoWrapper>
            {libraryInfo.slice(2, 4).map((item, index) => (
              <MainInfo
                key={index + 2}
                item={item}
                isShow={openedCardName === "library"}
                delay={0.3}
                dashOffset={dashValues[index + 2]}
                dashColor={
                  dashValues[index + 2] <= 11
                    ? "red"
                    : dashValues[index + 2] <= 33
                    ? "yellow"
                    : null
                }
              />
            ))}
          </InfoWrapper>
        )}
        {selectedLibraryPlace === "a" && libraryInfo.length > 4 && (
          <InfoWrapper>
            {libraryInfo.slice(4, 7).map((item, index) => (
              <SubInfo
                key={index + 4}
                item={item}
                isShow={openedCardName === "library"}
                delay={0.5}
                dashOffset={linearDashValues[index]}
              />
            ))}
          </InfoWrapper>
        )}
      </PlaceContainer>
    </LibraryCardContainer>
  );
};

export default React.memo(LibaryCard, (prevProps, nextProps) => {
  return (
    prevProps.openedCardName !== "library" &&
    nextProps.openedCardName !== "library"
  );
});
