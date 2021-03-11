import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    selectBlueTeam,
    selectBlueTeamScore,
    selectGreenTeam,
    selectGreenTeamScore,
} from "../../store/slices/game/gameSelector";
import TeamType from "../../types/TeamType";
import { TeamContainerInThreeColumns } from "./styled";

type TeamContainerProps = {
    team: TeamType
}

export default function TeamContainer(props: TeamContainerProps) {
    const greenTeam = useSelector(selectGreenTeam);
    const blueTeam = useSelector(selectBlueTeam);
    const greenScore = useSelector(selectGreenTeamScore);
    const blueScore = useSelector(selectBlueTeamScore);
    const [members, setMembers] = useState();

    useEffect(() => {
        let membersListText;
        if (props.team === TeamType.GreenTeam) {
            membersListText = greenTeam.join(", ");
        } else {
            membersListText = blueTeam && blueTeam.join(", ");
        }
        setMembers(membersListText);
    }, [greenTeam, blueTeam, props.team]);

    return (
        <TeamContainerInThreeColumns team={props.team}>
            <h4>{props.team === TeamType.GreenTeam? "Green team" : "Blue team"}</h4>
            <div>Members: {members}</div>
            <div>Score: {props.team === TeamType.GreenTeam ? greenScore : blueScore}</div>
        </TeamContainerInThreeColumns>
    );
}
