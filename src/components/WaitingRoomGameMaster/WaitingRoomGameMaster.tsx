import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { selectPlayers } from "../../store/slices/game/gameSelector";
import { asyncGameActions } from "../../store/slices/game/slice";

export default function WaitingRoomGameMasterPart() {
    const players = useSelector(selectPlayers);
    const dispatch = useDispatch();

    const formTeams = () => {
        dispatch(asyncGameActions.createTeams("create"));
    };

    return (
        <React.Fragment>
            <hr />
            {players && players.length > 1 && (
                <div>
                    <Button onClick={formTeams} variant="warning">
                        Form teams
                    </Button>
                </div>
            )}
        </React.Fragment>
    );
}
