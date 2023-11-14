import styled from 'styled-components';

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  min-width: 160px;
  width: 100%;
  height: 40px;

  border: ${(props) => props.theme.mode === 'light' ? '1px solid #f0f1f5' : '1px solid #2c3038'};
  outline: none;
  color: ${(props) => props.theme.contentText};
  font-size: 14px;
  letter-spacing: -1px;

  background-color: ${(props) => props.theme.foreground};
  padding: 4px 4px 4px 8px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    border: 1px solid #00000040;
  }
`

const RowInputWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`

export { InputBox, RowInputWrap };
