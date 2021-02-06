import GamePhasesType from "../../types/GamePhases";
import StartGame from "../StartGame/StartGame"
import JoinGame from "../JoinGame/JoinGame"
import WaitingRoom from "../WaitingRoom/WaitingRoom"
import AddNames from "../AddNames/AddNames"
import PlayGame from "../PlayGame/PlayGame"
import EndGame from "../EndGame/EndGame"


export const gamePhases: GamePhasesType = {
    startGame: {
        component: <StartGame />
    },
    joinGame: {
        component: <JoinGame />,
    },
    waitingRoom: {
        component: <WaitingRoom />,
    },
    addNames: {
        component: <AddNames />,
    },
    playGame: {
        component: <PlayGame />,
    },
    endGame: {
        component: <EndGame />,
    },
};
