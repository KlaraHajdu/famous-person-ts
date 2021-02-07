import React from "react";
import Button from "react-bootstrap/Button";
import { shuffle } from "../../utils/randomUtil";
import { useSelector } from "react-redux";
import { selectPlayers } from "../../store/slices/game/gameSelector";

export default function WaitingRoomGameMasterPart() {
    const players = useSelector(selectPlayers);

    const actAfterTeamsAdded = (err: any) => {
        if (!!err) {
            console.log(err);
        } else {
            console.log("Teams added successfully");
        }
    };

    const actAfterSetGamePhase = (err: any) => {
        if (!!err) {
            console.log(err);
        } else {
            console.log("Phase changed successfully");
        }
    };

    const formTeams = () => {
        const shuffledPlayers = shuffle(players);
        const middle = Math.ceil(players.length / 2);
        const blueTeam = shuffledPlayers.slice(0, middle);
        const greenTeam = shuffledPlayers.slice(middle);

        // appFirebase.databaseApi.create(
        //   `games/${game.gameId}/teams`,
        //   { blueTeam, greenTeam },
        //   actAfterTeamsAdded
        // );
        // appFirebase.databaseApi.create(
        //   `games/${game.gameId}/gamePhase`,
        //   "addNames",
        //   actAfterSetGamePhase
        // );
    };

    return (
        <React.Fragment>
            <hr />
            {players && players.length > 3 && (
                <div>
                    <Button onClick={formTeams} variant="warning">
                        Form teams
                    </Button>
                </div>
            )}
        </React.Fragment>
    );
}
