import styled from "styled-components"
import { gameTheme } from "../../Theme/theme";
import TeamType from "../../types/TeamType";

export const TeamContainerInThreeColumns = styled.div<{team: TeamType}>`
    width: 80%;

    margin: 3em auto;
    & div {
        margin-top: 10px;
    }

    padding: 2em;

    border-radius: 10px;

    color: white;
    
    background-color: ${(props: any) => 
        props.team === TeamType.GreenTeam? gameTheme.greenBackgroundColor : gameTheme.blueBackgroundColor };
`;