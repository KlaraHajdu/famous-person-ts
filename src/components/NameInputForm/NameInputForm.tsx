import React, { ChangeEvent, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectBlueTeamNames, selectGreenTeamNames, selectOwnTeam } from "../../store/slices/game/gameSelector";
import { asyncGameActions } from "../../store/slices/game/slice";

export default function NameInputForm(props: { numberOfNames: number }) {
    const { numberOfNames } = props;
    const ownTeam = useSelector(selectOwnTeam);
    const greenTeamNames = useSelector(selectGreenTeamNames);
    const blueTeamNames = useSelector(selectBlueTeamNames);
    const [namesSubmittedByTeam, setNamesSubmittedByTeam] = useState<number>(0);
    const [nameToSubmit, setNameToSubmit] = useState<string>("");
    const [helperText, setHelperText] = useState<null | string>(null);
    const dispatch = useDispatch();

    const saveNameToSubmit = (event: ChangeEvent<HTMLInputElement>) => {
        let name = event.target.value;
        if (name.length > 20) setHelperText("Name too long!");
        if (name.length === 0) {
            setHelperText("Please give a name!");
            setNameToSubmit("");
        } else {
            setNameToSubmit(event.target.value);
            setHelperText(null);
        }
    };

    const submitName = async () => {
        if (helperText) {
            return;
        }
        dispatch(asyncGameActions.checkIfNameExists(nameToSubmit));
        setNameToSubmit("");
    };

    useEffect(() => {
        if (!ownTeam) {
            return;
        }
        if (ownTeam === "greenTeam") {
            setNamesSubmittedByTeam(greenTeamNames.length);
        } else {
            setNamesSubmittedByTeam(blueTeamNames.length);
        }
    }, [blueTeamNames, greenTeamNames, ownTeam]);

    if (namesSubmittedByTeam >= numberOfNames / 2)
        return (
            <div>
                <p>Your team has already submitted {numberOfNames / 2}.</p>
                <p>Please wait for the other team to finish uploading their names.</p>
            </div>
        );

    return (
        <div>
            <div>
                Your team has added {namesSubmittedByTeam} {namesSubmittedByTeam > 1 ? "names" : "name"} from the{" "}
                {numberOfNames / 2}.
            </div>
            <Form>
                <Form.Group controlId="formPlayerName">
                    <Form.Control
                        onChange={saveNameToSubmit}
                        value={nameToSubmit}
                        type="text"
                        placeholder="Someone to be guessed in the game"
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Text muted>{helperText}</Form.Text>
                <Button variant="warning" onClick={submitName}>
                    Submit name
                </Button>
            </Form>
        </div>
    );
}
