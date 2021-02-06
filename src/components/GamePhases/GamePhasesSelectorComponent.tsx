import React from "react";
import { useSelector } from "react-redux";
import { selectGamePhase } from "../../store/slices/gamePhase/gamePhaseSelector";
import GamePhase from "../../types/GamePhase";
import { gamePhases as gamePhasesObject } from "./gamePhaseObject";

function GamePhasesSelectorComponent() {
    const gamePhase: GamePhase = useSelector(selectGamePhase);

    return gamePhase && <div>{gamePhasesObject[gamePhase].component}</div>;
}

export default GamePhasesSelectorComponent;
