import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DeletePlayer from "../DeletePlayer/DeletePlayer";
import { Container } from "./styled";

type PlayGameMasterProps = {
    playerOnTurn: string;
};

export default function PlayGameMaster(props: PlayGameMasterProps) {
    const [wantToDelete, setWantToDelete] = useState(false);

    const clickDeleteButton = () => {
        setWantToDelete(true);
    };

    const handleClosing = () => {
        setWantToDelete(false);
    };

    if (wantToDelete) {
        return (
            <div>
                <DeletePlayer handleClosing={handleClosing} playerOnTurn={props.playerOnTurn} />
            </div>
        );
    }

    return (
        <Container>
            <Button onClick={clickDeleteButton} variant="outline-secondary" data-testid="delete-player-button">
                Delete the player on turn
            </Button>
        </Container>
    );
}
