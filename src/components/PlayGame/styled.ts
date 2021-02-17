import styled from "styled-components"
import { gameTheme } from "../../Theme/theme"
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";

export const MiddleContainerInThreeColumns = styled.div`
    margin: 3em auto;
    width: 80%;
    background-color: ${gameTheme.whiteBackgroundColor};
    padding: 2em;
    border-radius: 10px;
`

export const StyledBadge = styled(Badge)<{ team: string }>`
    background-color: ${(prop: { team: string; }) => prop.team === "greenTeam" ? gameTheme.greenBackgroundColor : gameTheme.blueBackgroundColor}
`
export const StyledSpan = styled.span`
    font-weight: bold;
`

export const StyledRow = styled(Row)`
    width: 100vw;
`
