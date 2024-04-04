import styled from "styled-components";

const LibraryCardContainer = styled("div")`
  transition: all 0.3s;
  position: absolute;
  top: 40px;
  right: 0px;
  min-width: 300px;
  width: max-content;

  display: flex;
  flex-direction: column;
  background-color: ${(props) =>
    props.theme.mode === "light" ? "#ffffff" : "#1d2128"};

  z-index: 100;

  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.boxShadow};

  transform: ${(props) =>
    props.isshow ? "translateY(0)" : "translateY(-24px)"};
  transform-origin: top right;
  opacity: ${(props) => (props.isshow ? "1" : "0")};
  user-select: ${(props) => (props.isshow ? "auto" : "none")};
  pointer-events: ${(props) => (props.isshow ? "auto" : "none")};
  scale: ${(props) => (props.isshow ? "1" : "0.9")};
`;

const LibraryCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 0 0 16px 16px;
  gap: 16px;
`;

const PlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 12px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export { LibraryCardContainer, LibraryCardHeader, PlaceContainer, InfoWrapper };
