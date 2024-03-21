import styled from "styled-components";

const TopBarRightContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  flex-shrink: 0;
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
`;

export { TopBarRightContainer, CardWrapper };
