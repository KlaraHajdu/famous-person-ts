import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    selectBlueTeam,
    selectBlueTeamScore,
    selectGreenTeam,
    selectGreenTeamScore,
} from "../../store/slices/game/gameSelector";
import { TeamContainerInThreeColumns } from "./styled";

type TeamType = {
    team: string;
};

export default function TeamContainer(props: TeamType) {
    const greenTeam = useSelector(selectGreenTeam);
    const blueTeam = useSelector(selectBlueTeam);
    const greenScore = useSelector(selectGreenTeamScore);
    const blueScore = useSelector(selectBlueTeamScore);
    const [members, setMembers] = useState();

    useEffect(() => {
        let membersListText;
        if (props.team === "greenTeam") {
            membersListText = greenTeam.join(", ");
        } else {
            membersListText = blueTeam && blueTeam.join(", ");
        }
        setMembers(membersListText);
    }, [greenTeam, blueTeam]);

    return (
        <TeamContainerInThreeColumns team={props.team}>
            <h4>{props.team === "greenTeam" ? "Green team" : "Blue team"}</h4>
            <div>Members: {members}</div>
            <div>Score: {props.team === "greenTeam" ? greenScore : blueScore}</div>
        </TeamContainerInThreeColumns>
    );
}
