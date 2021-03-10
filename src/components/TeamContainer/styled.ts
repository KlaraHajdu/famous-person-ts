import styled from "styled-components"
import { gameTheme } from "../../Theme/theme";

export const TeamContainerInThreeColumns = styled.div<{team: string}>`
    width: 80%;

    margin: 3em auto;
    & div {
        margin-top: 10px;
    }

    padding: 2em;

    border-radius: 10px;

    color: white;
    
    background-color: ${(props: any) => props.team === "greenTeam"? gameTheme.greenBackgroundColor : gameTheme.blueBackgroundColor };
`;