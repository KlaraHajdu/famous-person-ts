import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import { selectAllNames, selectGameMaster, selectOwnName } from "../../store/slices/game/gameSelector";
import { asyncGamePhaseActions } from "../../store/slices/gamePhase/slice";
import { CONSTANTS } from "../../constants";
import NameInputForm from "../NameInputForm/NameInputForm";
import PhaseHeader from "../PhaseHeader/PhaseHeader";
import TeamContainer from "../TeamContainer/TeamContainer";
import GamePhase from "../../types/GamePhase";
import { MiddleContainerInThreeColumns, StyledRow } from "./styled";
import TeamType from "../../types/TeamType";

function AddNames() {
    const NUMBER_OF_NAMES_TO_START_GAME = CONSTANTS.NUMBER_OF_NAMES_TO_START_GAME;
    const namesSubmitted = useSelector(selectAllNames);
    const ownName = useSelector(selectOwnName);
    const gameMaster = useSelector(selectGameMaster);
    const dispatch = useDispatch();

    useEffect(() => {
        if (ownName !== gameMaster) {
            return;
        }

        const changeGamePhase = async () => {
            await dispatch(asyncGamePhaseActions.changeGamePhase(GamePhase.PLAY_GAME));
        };

        if (namesSubmitted.length === NUMBER_OF_NAMES_TO_START_GAME) {
            changeGamePhase();
        }
    }, [NUMBER_OF_NAMES_TO_START_GAME, dispatch, gameMaster, namesSubmitted, ownName]);

    return (
            <StyledRow>
                <Col xs={12} md={3}>
                    <TeamContainer team={TeamType.BlueTeam} />
                </Col>
                <Col xs={12} md={6}>
                    <MiddleContainerInThreeColumns>
                        <PhaseHeader title="Add names to the game" subtitle="" />
                        <NameInputForm numberOfNames={NUMBER_OF_NAMES_TO_START_GAME} />
                    </MiddleContainerInThreeColumns>
                </Col>
                <Col xs={12} md={3}>
                    <TeamContainer team={TeamType.GreenTeam} />
                </Col>
            </StyledRow>
    );
}

export default AddNames;
