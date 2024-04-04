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

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${(props) => props.theme.primary};
`;

export { TopBarRightContainer, CardWrapper, IconWrapper };
