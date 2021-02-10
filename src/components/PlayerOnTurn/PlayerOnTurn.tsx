import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CounterStyle, CountdownItemStyle } from "./styled";
import GuessWord from "../GuessWord/GuessWord";
import SvgCircle from "../SvgCircle/SvgCircle";
import { selectRound, selectTeamOnTurn } from "../../store/slices/game/gameSelector";
import { asyncGameActions } from "../../store/slices/game/slice";
import { asyncGamePhaseActions } from "../../store/slices/gamePhase/slice";
import GamePhase from "../../types/GamePhase";

export default function PlayerOnTurn(props: any) {
    const mapNumber = (number: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
        return ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    };
    const ROUND_LENGTH = 10;
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
        console.log("end of round")
        dispatch(asyncGameActions.updateTeamOnTurn(nextTeam));
        dispatch(asyncGameActions.updatePlayerIndex(teamOnTurn));
    };

    useEffect(() => {
        let unmounted = false;
        let counterTimeout: NodeJS.Timeout;
        console.log("playeronturn useffect")
        console.log("turnStarted " + turnStarted)
        if (!unmounted) {
            if (counter === 0 && turnStarted === true) {
                setTurnStarted(false);
                console.log('calling end turn from playeronturn because counter 0')
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
        <div>
            <Row>
                <Col>
                    <h4>It is your turn!</h4>
                </Col>
                <Col style={{ height: 60 }}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {turnStarted ? (
                            ""
                        ) : (
                            <Button style={{ width: 140 }} onClick={startTurn}>
                                Start your turn
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                {ROUND_LENGTH >= counter && counter > 0 && turnStarted && <GuessWord endRound={endRound} />}
            </Row>
            <Row className="justify-content-md-center">
                <div>
                    {counter && (
                        <div>
                            <CountdownItemStyle>
                                <SvgCircle radius={counterRadius} />
                                <CounterStyle>
                                    <h1>{counter}</h1>
                                </CounterStyle>
                            </CountdownItemStyle>
                        </div>
                    )}
                </div>
            </Row>
        </div>
    );
}
