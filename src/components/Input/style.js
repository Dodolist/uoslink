import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 16px;
`

const InputLabel = styled.div`
  color: ${(props) => props.theme.subText};
  font-size: 12px;
  letter-spacing: -1px;
`

const InputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  min-width: 330px;
  height: 40px;
`

const input = styled.input`
  width: 100%;
  height: 100%;
  border: ${(props) => props.theme.mode === 'light' ? '1px solid #f0f1f5' : '1px solid #2c3038'};
  outline: none;
  color: ${(props) => props.theme.contentText};
  font-size: 14px;
  letter-spacing: -1px;

  background-color: ${(props) => props.theme.foreground};
  padding: 4px 4px 4px 8px;
  border-radius: 8px;

  &:focus {
    border: 1px solid #00000040;
  }
`

export { InputContainer, InputLabel, InputBox, input };
