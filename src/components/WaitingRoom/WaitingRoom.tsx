import React, { useEffect } from "react";
import WaitingRoomGameMasterPart from "../WaitingRoomGameMaster/WaitingRoomGameMaster";
import PlayersTable from "../PlayersTable/PlayersTable";
import PhaseHeader from "../PhaseHeader/PhaseHeader";
import { useSelector, useDispatch } from "react-redux";
import { selectGameMaster, selectOwnName, selectPlayers } from "../../store/slices/game/gameSelector";
import { MainTile } from "../../Theme/theme";

function WaitingRoom() {
    const ownName = useSelector(selectOwnName);
    const gameMaster = useSelector(selectGameMaster);
    const players = useSelector(selectPlayers);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     const setTeamInfos = (snapshot) => {
    //         const teamsDB = snapshot.val();
    //         const ownTeam = teamsDB.greenTeam.includes(game.ownName) ? "greenTeam" : "blueTeam";
    //         dispatch(joinOwnTeam(ownTeam));
    //         dispatch(setGreenTeam(snapshot.val().greenTeam));
    //         dispatch(setBlueTeam(snapshot.val().blueTeam));
    //         sessionStorage.setItem("ownTeam", ownTeam);
    //         sessionStorage.setItem("greenTeam", snapshot.val().greenTeam);
    //         sessionStorage.setItem("blueTeam", snapshot.val().blueTeam);
    //     };

    //     const actAfterNewPlayerAdded = (err) => {
    //         if (!!err) console.log(err);
    //         else console.log("New player added to team: " + game.ownName);
    //     };

    //     const addNewPlayerToTeams = (snapshot) => {
    //         let teamToGrow;
    //         teamToGrow = snapshot.val().greenTeam.length > snapshot.val().blueTeam.length ? "blueTeam" : "greenTeam";

    //         appFirebase.databaseApi.create(
    //             `games/${game.gameId}/teams/${teamToGrow}/${snapshot.val()[teamToGrow].length}`,
    //             game.ownName,
    //             actAfterNewPlayerAdded
    //         );
    //     };
    //     const checkIfPlayerIsPartOfTeam = async () => {
    //         let playerIsPart;
    //         try {
    //             let teamsSnapshot = await appFirebase.database().ref(`games/${game.gameId}/teams`).once("value");
    //             playerIsPart =
    //                 teamsSnapshot.val().greenTeam.includes(game.ownName) ||
    //                 teamsSnapshot.val().blueTeam.includes(game.ownName);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //         return playerIsPart;
    //     };

    //     const actAfterAddNewPlayer = (err) => {
    //         if (!!err) {
    //             console.log(err);
    //         } else {
    //             console.log("Myself added successfully to game");
    //         }
    //     };

    //     const handlePlayersResult = (snapshot) => {
    //         if (snapshot.val() && JSON.stringify(Object.keys(snapshot.val())) !== JSON.stringify(game.players)) {
    //             let playersList = [];
    //             playersList.push(Object.keys(snapshot.val()));
    //             dispatch(updatePlayers(Object.keys(snapshot.val())));
    //             sessionStorage.setItem("players", playersList);
    //         }
    //     };
    //     const handleGamePhaseResult = async (snapshot) => {
    //         const DBGamePhase = snapshot.val();

    //         if (DBGamePhase === "addNames") {
    //             appFirebase.databaseApi.readOn(`games/${game.gameId}/teams`, setTeamInfos);
    //             let playerIsInTeam = await checkIfPlayerIsPartOfTeam();
    //             if (!playerIsInTeam) {
    //                 appFirebase.databaseApi.readOnce(`games/${game.gameId}/teams`, addNewPlayerToTeams);
    //             }
    //         }
    //     };

    //     appFirebase.databaseApi.create(`games/${game.gameId}/players/${game.ownName}`, true, actAfterAddNewPlayer);
    //     appFirebase.databaseApi.readOn(`games/${game.gameId}/players`, handlePlayersResult);
    //     appFirebase.databaseApi.readOn(`games/${game.gameId}/gamePhase`, handleGamePhaseResult);
    // }, []); // []

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
