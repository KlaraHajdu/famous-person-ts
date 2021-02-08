import React from "react";
import WaitingRoomGameMasterPart from "../WaitingRoomGameMaster/WaitingRoomGameMaster";
import PlayersTable from "../PlayersTable/PlayersTable";
import PhaseHeader from "../PhaseHeader/PhaseHeader";
import { useSelector } from "react-redux";
import { selectGameMaster, selectOwnName, selectPlayers } from "../../store/slices/game/gameSelector";
import { MainTile } from "../../Theme/theme";

function WaitingRoom() {
    const ownName = useSelector(selectOwnName);
    const gameMaster = useSelector(selectGameMaster);
    const players = useSelector(selectPlayers);

    return (
        <MainTile>
            <PhaseHeader title="Waiting room" subtitle="" />
            <div>
                <h5>Joined players</h5>
                <PlayersTable title={"Players"} players={players} />
            </div>
            {ownName === gameMaster && <WaitingRoomGameMasterPart />}
        </MainTile>
    );
}

export default WaitingRoom;
