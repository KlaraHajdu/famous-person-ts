import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DeletePlayer from "../DeletePlayer/DeletePlayer";

export default function PlayGameMaster() {
    const [wantToDelete, setWantToDelete] = useState(false);

    const pushDeleteButton = () => {
        setWantToDelete(true);
    };

    const handleClosing = () => {
        setWantToDelete(false);
    };


    if (wantToDelete) {
        
        return (<div> <DeletePlayer handleClosing={handleClosing}/></div>)
    }

    return (
        <div>
            <Button onClick={pushDeleteButton} variant="outline-secondary" data-testid="delete-player-button">
                Delete a player
            </Button>
        </div>
    );
}
