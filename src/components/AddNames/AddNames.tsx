import React, { useEffect } from "react";
import NameInputForm from "../NameInputForm/NameInputForm";
import PhaseHeader from "../PhaseHeader/PhaseHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TeamContainer from "../TeamContainer/TeamContainer";
import { MiddleContainerInThreeColumns } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { selectAllNames, selectGameMaster, selectOwnName } from "../../store/slices/game/gameSelector";
import { asyncGamePhaseActions } from "../../store/slices/gamePhase/slice";
import GamePhase from "../../types/GamePhase";

function AddNames() {
    const NUMBER_OF_NAMES_TO_START_GAME = 2;
    const namesSubmitted = useSelector(selectAllNames);
    const ownName = useSelector(selectOwnName)
    const gameMaster = useSelector(selectGameMaster)
    const dispatch = useDispatch()

    useEffect(() => {
        if (ownName !== gameMaster) {
           return
        }
        if (namesSubmitted.length === NUMBER_OF_NAMES_TO_START_GAME) {
            dispatch(asyncGamePhaseActions.changeGamePhase(GamePhase.PLAY_GAME))
        }

    }, [dispatch, gameMaster, namesSubmitted, ownName])

    return (
        <div>
            <Row style={{ width: "100vw" }}>
                <Col xs={12} md={3}>
                    <TeamContainer team="blueTeam" />
                </Col>
                <Col xs={12} md={6}>
                    <MiddleContainerInThreeColumns>
                        <PhaseHeader title="Add names to the game" subtitle="" />
                        <NameInputForm numberOfNames={NUMBER_OF_NAMES_TO_START_GAME} />
                    </MiddleContainerInThreeColumns>
                </Col>
                <Col xs={12} md={3}>
                    <TeamContainer team="greenTeam" />
                </Col>
            </Row>
        </div>
    );
}

export default AddNames;
