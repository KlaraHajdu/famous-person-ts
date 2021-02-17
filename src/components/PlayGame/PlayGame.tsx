import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import UIfx from "uifx";
import {
    selectBluePlayerIndex,
    selectBlueTeam,
    selectGameMaster,
    selectGreenPlayerIndex,
    selectGreenTeam,
    selectOwnName,
    selectRound,
    selectTeamOnTurn,
    selectTurnOngoing,
} from "../../store/slices/game/gameSelector";
import { asyncGameActions } from "../../store/slices/game/slice";
import toneAudio from "../../static/tone.mp3";
import PhaseHeader from "../PhaseHeader/PhaseHeader";
import TeamContainer from "../TeamContainer/TeamContainer";
import PlayerOnTurn from "../PlayerOnTurn/PlayerOnTurn";
import PlayGameMaster from "../PlayGameMaster/PlayGameMaster";
import { MiddleContainerInThreeColumns, StyledBadge, StyledSpan, StyledRow as Row } from "./styled";

function PlayGame() {
    const greenTeam = useSelector(selectGreenTeam);
    const blueTeam = useSelector(selectBlueTeam);
    const ownName = useSelector(selectOwnName);
    const gameMaster = useSelector(selectGameMaster);
    const round = useSelector(selectRound);
    const bluePlayerIndex = useSelector(selectBluePlayerIndex);
    const greenPlayerIndex = useSelector(selectGreenPlayerIndex);
    const teamOnTurn = useSelector(selectTeamOnTurn);
    const turnOngoing = useSelector(selectTurnOngoing);
    const [subTitle, setSubTitle] = useState<string>("");
    const [playerOnTurn, setPlayerOnTurn] = useState<string>("");
    const [canDelete, setCanDelete] = useState<boolean>(false);
    const dispatch = useDispatch();
    const tone = useMemo(() => new UIfx(toneAudio), []);

    const endTurn = async () => {
        dispatch(asyncGameActions.updateTurnOngoing(false));
        const nextTeam = teamOnTurn === "greenTeam" ? "blueTeam" : "greenTeam";
        dispatch(asyncGameActions.updateTeamOnTurn(nextTeam));
        dispatch(asyncGameActions.updatePlayerIndex({ team: teamOnTurn, change: 1 }));
    };

    useEffect(() => {
        if (turnOngoing === "false") {
            tone.play();
        }
    }, [tone, turnOngoing]);

    useEffect(() => {
        if (ownName !== gameMaster) {
            return;
        }
        if (
            Number(sessionStorage.getItem("greenTeamScore")) === 0 &&
            Number(sessionStorage.getItem("blueTeamScore")) === 0
        ) {
            dispatch(asyncGameActions.startPlay(""));
        }
    }, [dispatch, gameMaster, ownName]);

    useEffect(() => {
        switch (round) {
            case 1:
                setSubTitle("1st round: Explain in detail");
                break;
            case 2:
                setSubTitle("2nd round: explain with one word");
                break;
            case 3:
                setSubTitle("3rd round: pantomime");
                break;
        }
    }, [round]);

    useEffect(() => {
        if (ownName === gameMaster && greenTeam.length + blueTeam.length > 4) {
            setCanDelete(true);
        }
    }, [blueTeam.length, gameMaster, greenTeam.length, ownName]);

    useEffect(() => {
        if (teamOnTurn === "greenTeam") {
            setPlayerOnTurn(greenTeam[greenPlayerIndex]);
        } else {
            setPlayerOnTurn(blueTeam[bluePlayerIndex]);
        }
    }, [teamOnTurn, greenPlayerIndex, bluePlayerIndex, greenTeam, blueTeam, ownName, gameMaster, dispatch]);

    return (
        <Row>
            <Col xs={12} md={3}>
                <TeamContainer team="blueTeam" />
            </Col>
            <Col xs={12} md={6}>
                <MiddleContainerInThreeColumns>
                    <PhaseHeader title="" subtitle={subTitle} />
                    The{" "}
                    <StyledBadge team={teamOnTurn} data-testid="team-on-turn">
                        {teamOnTurn === "greenTeam" ? "green" : "blue"} team
                    </StyledBadge>{" "}
                    is guessing. It is <StyledSpan data-testid="player-on-turn"> {playerOnTurn} </StyledSpan>'s turn
                    now.
                    {ownName === playerOnTurn && <PlayerOnTurn endTurn={endTurn} />}
                    {canDelete && <PlayGameMaster />}
                </MiddleContainerInThreeColumns>
            </Col>
            <Col xs={12} md={3}>
                <TeamContainer team="greenTeam" />
            </Col>
        </Row>
    );
}

export default PlayGame;
