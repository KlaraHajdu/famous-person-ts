import styled from "styled-components"
import { gameTheme } from "../../Theme/theme";

export const TeamContainerInThreeColumns = styled.div<{team: string}>`
margin: 3em auto;
width: 80%;
background-color: ${(props: any) => props.team === "greenTeam"? gameTheme.greenBackgroundColor : gameTheme.blueBackgroundColor };
padding: 2em;
border-radius: 10px;
color: white;
& div {
    margin-top: 10px;
}
`;