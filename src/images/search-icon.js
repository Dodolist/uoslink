import styled from "styled-components";
import {ReactComponent as SearchIconSVG} from "./search-icon.svg";

const SearchIcon = styled(SearchIconSVG)`
  width: 100%;
  height: 100%;
  * {
    fill: ${(props) => props.theme.primary};
  }
`;

export default SearchIcon;
