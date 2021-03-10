import styled from "styled-components"
import Row from "react-bootstrap/Row";
import { gameTheme } from "../../Theme/theme"

export const MiddleContainerInThreeColumns = styled.div`
    width: 80%;
    @media screen and (max-width: 400px) {
        width:90%;
    }

    margin: 3em auto;
    padding: 2em;

    border-radius: 10px;
    
    background-color:  ${gameTheme.whiteBackgroundColor};;
`;

export const StyledRow = styled(Row)`
    width: 100vw;
`