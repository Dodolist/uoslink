import styled, { css } from 'styled-components'

const Button = styled.button`
  color: ${(props) => props.theme.titleText};
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -1px;

  width: 100%;
  padding: 20px 0;
  background-color: ${(props) => props.theme.foreground};

  border: none;
  border-radius: 12px;
  outline: none;

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
  &:active {
    transition: all 0.05s;
    filter: brightness(0.8);
  }

  ${(props) => props.color === 'blue' && css`
    color: #ffffff;
    background-color: #408cff;
  `}
  ${(props) => props.color === 'red' && css`
    color: #ffffff;
    background-color: #ff5a5f;
  `}
  ${(props) => props.type === true && css`
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
  `}
`

export { Button }
