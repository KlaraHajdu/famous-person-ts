import React from "react";
import { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector, useDispatch } from "react-redux";
import { selectGameId } from "../../store/slices/game/gameSelector";
import { selectGamePhase } from "../../store/slices/gamePhase/gamePhaseSelector";
import { asyncGamePhaseActions, gamePhaseActions } from "../../store/slices/gamePhase/slice";
import GamePhase from "../../types/GamePhase";
import { Styles } from "./styled";
import HowToPlay from "../HowToPlay/HowToPlay";
import { asyncGameActions } from "../../store/slices/game/slice";

export default function Header() {
    const gameId = useSelector(selectGameId);
    const gamePhase = useSelector(selectGamePhase);
    const dispatch = useDispatch();

    const startGameAsMaster = () => {
        dispatch(gamePhaseActions.NEXT_GAMEPHASE_ENTERED(GamePhase.START_GAME));
    };

    const joinNewGame = () => {
        dispatch(gamePhaseActions.NEXT_GAMEPHASE_ENTERED(GamePhase.JOIN_GAME));
    };

    const clickOpenHowToPlayModal = () => {
        dispatch(gamePhaseActions.HOWTOPLAYMODAL_TOGGLED(true));
    };

    useEffect(() => {
        // const handleGamePhaseResult = (snapshot) => {
        //     const DBGamePhase = snapshot.val();

        //     if (game && DBGamePhase !== gamePhase) {
        //         if (DBGamePhase) {
        //             setGamePhase(gamePhases[DBGamePhase]);
        //             sessionStorage.setItem("gamePhase", DBGamePhase);
        //         }
        //     }
        // };

        // appFirebase.databaseApi.readOn(`games/${game ? game.gameId : 0}/gamePhase`, handleGamePhaseResult);
        console.log(gameId);
        if (gameId) {
            console.log(gameId)
            dispatch(asyncGameActions.subscribeToGame(gameId))
            dispatch(asyncGamePhaseActions.subscribeToGamePhase(gameId))
        }
    }, [gameId, dispatch]);

    return (
        <Styles>
            <Navbar expand="lg" className="justify-content-between">
                <Nav>
                    <Navbar.Brand>Guess!</Navbar.Brand>
                </Nav>
                <Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav.Link id="nav-link" onClick={clickOpenHowToPlayModal}>
                            How to play
                        </Nav.Link>
                        <Nav>
                            <NavDropdown alignRight title="Play" id="collapsible-nav-dropdown">
                                <NavDropdown.Item onClick={startGameAsMaster}>
                                    Start a new game as a game master
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={joinNewGame}>Join a game</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Nav>
            </Navbar>
            <HowToPlay />
        </Styles>
    );
}
