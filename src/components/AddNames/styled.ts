import styled from "styled-components"
import Row from "react-bootstrap/Row";
import { gameTheme } from "../../Theme/theme"

export const MiddleContainerInThreeColumns = styled.div`
    margin: 3em auto;
    width: 80%;
    background-color:  ${gameTheme.whiteBackgroundColor};;
    padding: 2em;
    border-radius: 10px;
`;

export const StyledRow = styled(Row)`
    width: 100vw;
`