import React, { useState, useContext, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { asyncGameActions } from "../../store/slices/game/slice";
import { MainTile } from "../../Theme/theme";

function JoinGame() {
    const dispatch = useDispatch();
    const [ownName, setOwnName] = useState<null | string>(null);
    const [gameId, setGameId] = useState<null | number>(null);
    const [helperText, setHelperText] = useState<null | string>(null);
    const [gameIdHelperText, setGameIdHelperText] = useState<null | string>(null);

    const saveOwnName = (e: ChangeEvent<HTMLInputElement>) => {
        let nameInput = e.target.value;
        if (nameInput.length === 0) setHelperText("Name cannot be empty!");
        else if (nameInput.length > 15) setHelperText("Name too long!");
        else {
            setHelperText(null);
            setOwnName(nameInput);
        }
    };

    const saveGameId = (e: ChangeEvent<HTMLInputElement>) => {
        let gameIdInput = e.target.value;
        if (!gameIdInput) {
            setGameIdHelperText("Game ID cannot be empty!");
        } else if (!Number(gameIdInput)) {
            setGameIdHelperText("Game ID is a number!");
        } else {
            setGameId(Number(gameIdInput));
            setGameIdHelperText(null);
        }
    };

    // const checkSnapshot = async (snapshot: any) => {
    //     if (!!snapshot.val()) {
    //         let playersSnapshot = await appFirebase.database().ref(`games/${gameId}/players`).once("value");
    //         let playersLowerCase = Object.keys(playersSnapshot.val()).map((name) => name.toLowerCase());
    //         if (playersLowerCase.includes(ownName.toLowerCase())) {
    //             setHelperText("This name is already taken, please choose another!");
    //         } else {
    //             dispatch(joinGame(ownName, gameId, snapshot.val().gameMaster));
    //             sessionStorage.setItem("gameId", gameId);
    //             sessionStorage.setItem("ownName", ownName);
    //             sessionStorage.setItem("gameMaster", snapshot.val().gameMaster);
    //         }
    //     } else {
    //         setGameIdHelperText("Wrong game ID!");
    //     }
    // };

    const verifyGameId = async (gameId: string) => {
        const gameExists = await dispatch(asyncGameActions.checkIfGameExists(gameId));
        return gameExists;
    };

    const handleJoinGame = async () => {
        if (helperText !== null || gameIdHelperText !== null || !gameId) {
            return;
        }

        const canJoinGame = await verifyGameId(gameId.toString());
        if (!canJoinGame) {
            setGameIdHelperText("Wrong game ID!");
            return;
        }

        if (!ownName) {
            return;
        }
        const playerNameExists = await dispatch(asyncGameActions.checkIfPlayerNameExists({ gameId, ownName }));
        console.log(playerNameExists);

        if (playerNameExists.payload) {
            setHelperText("This name is already taken, please choose another!");
            return;
        }
        else {
            dispatch(asyncGameActions.joinGame({gameId, ownName}))
        }
    };

    return (
        <MainTile>
            <h4>Join a game</h4>
            <Form>
                <Form.Group controlId="formPlayerName">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control
                        onChange={saveOwnName}
                        type="text"
                        placeholder="Your name that will appear during the game"
                        style={{ width: "100%" }}
                        autoComplete="off"
                    />
                    <Form.Text muted>{helperText}</Form.Text>
                </Form.Group>
                <Form.Group controlId="formGameID">
                    <Form.Label>Game ID</Form.Label>
                    <Form.Control
                        onChange={saveGameId}
                        type="text"
                        placeholder="The game ID you received from the game master"
                        style={{ width: "100%" }}
                        autoComplete="off"
                    />
                    <Form.Text muted>{gameIdHelperText}</Form.Text>
                </Form.Group>
                <Button variant="warning" onClick={handleJoinGame}>
                    Join the game
                </Button>
            </Form>
        </MainTile>
    );
}

export default JoinGame;
