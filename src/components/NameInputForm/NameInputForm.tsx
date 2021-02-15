import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
        else if (name.length === 0) {
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
        <>
            Your team has added{" "}
            <span data-testid="own-team-names">
                {namesSubmittedByTeam} {namesSubmittedByTeam > 1 ? "names" : "name"}
            </span>{" "}
            from the <span data-testid="all-names"> {numberOfNames / 2}.</span>
            <Form>
                <Form.Group controlId="formPlayerName">
                    <Form.Control
                        onChange={saveNameToSubmit}
                        value={nameToSubmit}
                        type="text"
                        placeholder="Someone to be guessed in the game"
                        autoComplete="off"
                        data-testid="name-input"
                    />
                </Form.Group>
                <Form.Text muted data-testid="helper-text">{helperText}</Form.Text>
                <Button variant="warning" onClick={submitName} data-testid="submit-name">
                    Submit name
                </Button>
            </Form>
        </>
    );
}
