import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { selectRound, selectTeamOnTurn } from "../../store/slices/game/gameSelector";
import { asyncGameActions } from "../../store/slices/game/slice";
import { asyncGamePhaseActions } from "../../store/slices/gamePhase/slice";
import constants from "../../constants";
import GamePhase from "../../types/GamePhase";
import GuessWord from "../GuessWord/GuessWord";
import { CounterStyle, CountdownItemStyle, StyledRow as Row, Container } from "./styled";
import SvgCircle from "../SvgCircle/SvgCircle";

export default function PlayerOnTurn(props: any) {
    const mapNumber = (number: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
        return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    };
    const ROUND_LENGTH = constants.ROUND_LENGTH;
    const [counter, setCounter] = useState(ROUND_LENGTH);
    const [turnStarted, setTurnStarted] = useState(false);
    const [counterRadius, setCounterRadius] = useState(mapNumber(counter, ROUND_LENGTH, 0, 0, 360));
    const round: number = useSelector(selectRound);
    const teamOnTurn = useSelector(selectTeamOnTurn);
    const dispatch = useDispatch();

    const startTurn = () => {
        setTurnStarted(true);
        dispatch(asyncGameActions.updateTurnOngoing(true));
    };

    const endRound = () => {
        setTurnStarted(false);
        dispatch(asyncGameActions.updateTurnOngoing(false));

        if (round === 3) {
            dispatch(asyncGamePhaseActions.changeGamePhase(GamePhase.END_GAME));
        } else {
            dispatch(asyncGameActions.updateRound(round));
        }

        const nextTeam = teamOnTurn === "greenTeam" ? "blueTeam" : "greenTeam";
        dispatch(asyncGameActions.updateTeamOnTurn(nextTeam));
        dispatch(asyncGameActions.updatePlayerIndex({ team: teamOnTurn, change: 1 }));
    };

    useEffect(() => {
        let unmounted = false;
        let counterTimeout: NodeJS.Timeout;
        if (!unmounted) {
            if (counter === 0 && turnStarted === true) {
                setTurnStarted(false);
                props.endTurn();
            }
            if (counter > 0 && turnStarted) {
                counterTimeout = setTimeout(() => setCounter(counter - 1), 1000);
                setCounterRadius(mapNumber(counter, ROUND_LENGTH, 0, 0, 360));
            }
        }
        return () => {
            clearTimeout(counterTimeout);
        };
    }, [turnStarted, counter, props]);

    return (
        <>
            <Row>
                <h4>It is your turn!</h4>
                <Container>{turnStarted ? "" : <Button onClick={startTurn}>Start your turn</Button>}</Container>
            </Row>
            <Row>{ROUND_LENGTH >= counter && counter > 0 && turnStarted && <GuessWord endRound={endRound} />}</Row>
            <Row>
                {counter && (
                    <CountdownItemStyle>
                        <SvgCircle radius={counterRadius} />
                        <CounterStyle>
                            <h1>{counter}</h1>
                        </CounterStyle>
                    </CountdownItemStyle>
                )}
            </Row>
        </>
    );
}
