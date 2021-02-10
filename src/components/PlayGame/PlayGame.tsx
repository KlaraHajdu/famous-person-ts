import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UIfx from "uifx";
import toneAudio from "../../static/tone.mp3";
import PhaseHeader from "../PhaseHeader/PhaseHeader";
import TeamContainer from "../TeamContainer/TeamContainer";
import PlayerOnTurn from "../PlayerOnTurn/PlayerOnTurn";
import { MiddleContainerInThreeColumns, StyledBadge, StyledDiv, StyledSpan } from "./styled";
import PlayGameMaster from "../PlayGameMaster/PlayGameMaster";
import { useSelector, useDispatch } from "react-redux";
import {
    selectBluePlayerIndex,
    selectBlueTeam,
    selectGameMaster,
    selectGreenPlayerIndex,
    selectGreenTeam,
    selectOwnName,
    selectRound,
    selectTeamOnTurn,
} from "../../store/slices/game/gameSelector";
import { asyncGameActions, gameActions } from "../../store/slices/game/slice";

function PlayGame() {
    const greenTeam = useSelector(selectGreenTeam);
    const blueTeam = useSelector(selectBlueTeam);
    const ownName = useSelector(selectOwnName);
    const gameMaster = useSelector(selectGameMaster);
    const round = useSelector(selectRound);
    const bluePlayerIndex = useSelector(selectBluePlayerIndex);
    const greenPlayerIndex = useSelector(selectGreenPlayerIndex);
    const teamOnTurn = useSelector(selectTeamOnTurn);
    const [subTitle, setSubTitle] = useState<string>("");
    const [playerOnTurn, setPlayerOnTurn] = useState<string>("");
    const [canDelete, setCanDelete] = useState<boolean>(false);
    const dispatch = useDispatch();
    const tone = new UIfx(toneAudio);

    const endTurn = async () => {
        console.log("play game end turn fn called")
        console.log("it is my turn: ")
        console.log(ownName === playerOnTurn)
        dispatch(asyncGameActions.updateTurnOngoing(false));
        const nextTeam = teamOnTurn === "greenTeam" ? "blueTeam" : "greenTeam";
        dispatch(asyncGameActions.updateTeamOnTurn(nextTeam));
        await dispatch(asyncGameActions.updatePlayerIndex(teamOnTurn));
    };
    console.log(playerOnTurn)

    useEffect(() => {
        if (ownName !== gameMaster) {
            return;
        }
        dispatch(asyncGameActions.startPlay(""));
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

        if (ownName !== gameMaster) {
            return;
        }
        if (greenPlayerIndex === greenTeam.length) {
            dispatch(asyncGameActions.updatePlayerIndex("greenTeam"));
        } else if (bluePlayerIndex === blueTeam.length) {
            dispatch(asyncGameActions.updatePlayerIndex("blueTeam"));
        }
    }, [teamOnTurn, greenPlayerIndex, bluePlayerIndex, greenTeam, blueTeam, ownName, gameMaster, dispatch]);

    return (
        <Row style={{ width: "100vw" }}>
            <Col xs={12} md={3}>
                <TeamContainer team="blueTeam" />
            </Col>
            <Col xs={12} md={6}>
                <MiddleContainerInThreeColumns>
                    <PhaseHeader title="" subtitle={subTitle} />
                    <div>
                        The{" "}
                        <StyledBadge team={teamOnTurn}>
                            {teamOnTurn === "greenTeam" ? "green" : "blue"} team
                        </StyledBadge>{" "}
                        is guessing. It is <StyledSpan> {playerOnTurn} </StyledSpan>'s turn now.
                    </div>
                    <StyledDiv>{ownName === playerOnTurn && <PlayerOnTurn endTurn={endTurn} />}</StyledDiv>
                    <div>{canDelete && <PlayGameMaster />}</div>
                </MiddleContainerInThreeColumns>
            </Col>
            <Col xs={12} md={3}>
                <TeamContainer team="greenTeam" />
            </Col>
        </Row>
    );
}

export default PlayGame;
