import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { asyncGameActions } from "../../store/slices/game/slice";
import { getRandomNumberFromTo } from "../../utils/randomUtil";
import { MainTile } from "../../Theme/theme";

export default function StartGame() {
    const [name, setName] = useState("");
    const [helperText, setHelperText] = useState<string | null>(null);
    const dispatch = useDispatch();

    const saveName = (e: any) => {
        let name = e.target.value;
        if (name.length === 0) setHelperText("Name cannot be empty!");
        else if (name.length > 15) setHelperText("Name too long!");
        else {
            setName(e.target.value);
            setHelperText(null);
        }
    };

    const generateId = async () => {
        let generatedId: number;
        let gameIdExists: any;
        do {
            generatedId = getRandomNumberFromTo(1000, 10000);
            const promise = await dispatch(asyncGameActions.checkIfGameExists(generatedId.toString()));
            if (promise.payload === "database down") {
                return;
            }
            gameIdExists = promise.payload;
        } while (gameIdExists);
        return generatedId;
    };

    const createNewGame = async () => {
        if (!helperText) {
            const gameId = await generateId();
            if (!gameId) {
                return;
            }
            const gameDetails = {
                gameId: gameId.toString(),
                gameMaster: name,
            };
            dispatch(asyncGameActions.createNewGame(gameDetails));
        }
    };

    return (
        <MainTile>
            <h4>Start a new game as game master</h4>
            <Form>
                <Form.Group controlId="formGameMasterName">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control
                        onChange={saveName}
                        type="text"
                        placeholder="Your name that will appear during the game"
                        autoComplete="off"
                    />
                    <Form.Text muted>{helperText}</Form.Text>
                </Form.Group>
                <Button variant="warning" onClick={createNewGame}>
                    Start a new game
                </Button>
            </Form>
        </MainTile>
    );
}
