import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { selectPlayers } from "../../store/slices/game/gameSelector";
import { asyncGameActions } from "../../store/slices/game/slice";
import { CONSTANTS } from "../../constants";

export default function WaitingRoomGameMasterPart() {
    const players = useSelector(selectPlayers);
    const dispatch = useDispatch();

    const formTeams = () => {
        dispatch(asyncGameActions.createTeams("create"));
    };

    return (
        <React.Fragment>
            <hr />
            {players && players.length >= CONSTANTS.NUMBER_OF_PLAYERS_TO_START_GAME && (
                <div>
                    <Button onClick={formTeams} variant="warning" data-testid="form-team-button">
                        Form teams
                    </Button>
                </div>
            )}
        </React.Fragment>
    );
}
