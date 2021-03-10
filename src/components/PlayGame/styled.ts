import styled from "styled-components"
import { gameTheme } from "../../Theme/theme"
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";

export const MiddleContainerInThreeColumns = styled.div`
    width: 80%;
    @media screen and (max-width: 400px) {
        width:90%;
    }

    margin: auto;
    margin-top: 3rem; 

    padding: 2em;

    border-radius: 10px;

    background-color: ${gameTheme.whiteBackgroundColor};
`

export const StyledBadge = styled(Badge)<{ team: string }>`
    background-color: ${(prop: { team: string; }) => prop.team === "greenTeam" ? gameTheme.greenBackgroundColor : gameTheme.blueBackgroundColor}
`
export const StyledSpan = styled.span`
    font-weight: bold;
`

export const StyledRow = styled(Row)`
    width: 100%;
    
    margin-right: 0px;
    margin-left: 0px;
`
