import styled from 'styled-components'

const DeleteButton = styled.div`
  position: absolute;
  top: ${(props) => props.isOpen ? 'calc( 100% + 24px )' : 'calc( 100% + 0px )'};
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 12px;
  background-color: #ff5a5f;

  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;

  transition-delay: 0.3s;
  opacity: ${(props) => props.isOpen ? '1' : '0'};

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    transition: all 0.05s;
    filter: brightness(0.8);
  }
`
export { DeleteButton }
