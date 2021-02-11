import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectBlueTeamScore, selectGreenTeamScore, selectOwnTeam } from "../../store/slices/game/gameSelector";
import { StyledBalloon as Balloon, StyledBadge as Badge, MainTile, ResultsContainer, TitleContainer } from "./styled";

export default function EndGame() {
    const [winnerTeam, setWinnerTeam] = useState<string>("");
    const [iAmWinner, setIAmWinner] = useState<boolean | null>(null);
    const [balloonTop1, setBalloonTop1] = useState<number>(410);
    const [balloonTop2, setBalloonTop2] = useState<number>(390);
    const [balloonTop3, setBalloonTop3] = useState<number>(410);
    const blueTeamScore = useSelector(selectBlueTeamScore);
    const greenTeamScore = useSelector(selectGreenTeamScore);
    const ownTeam = useSelector(selectOwnTeam);
    useEffect(() => {
        if (blueTeamScore > greenTeamScore) {
            setWinnerTeam("blue team");
        } else {
            setWinnerTeam("green team");
        }
    }, [blueTeamScore, greenTeamScore]);

    useEffect(() => {
        if (ownTeam === "greenTeam" && winnerTeam === "green team") {
            setIAmWinner(true);
        } else if (ownTeam === "blueTeam" && winnerTeam === "blue team") {
            setIAmWinner(true);
        } else {
            setIAmWinner(false);
        }
    }, [ownTeam, winnerTeam]);

    useEffect(() => {
        setTimeout(
            () =>
                balloonTop1 >= -280
                    ? balloonTop1 > 405
                        ? setBalloonTop1(balloonTop1 - 0.5)
                        : setBalloonTop1(balloonTop1 - 1.5)
                    : setBalloonTop1(410),
            10
        );
    }, [balloonTop1]);

    useEffect(() => {
        setTimeout(
            () =>
                balloonTop2 >= -280
                    ? balloonTop2 > 405
                        ? setBalloonTop2(balloonTop2 - 0.5)
                        : setBalloonTop2(balloonTop2 - 2)
                    : setBalloonTop2(410),
            10
        );
    }, [balloonTop2]);

    useEffect(() => {
        setTimeout(
            () =>
                balloonTop3 >= -280
                    ? balloonTop3 > 405
                        ? setBalloonTop3(balloonTop3 - 0.5)
                        : setBalloonTop3(balloonTop3 - 1)
                    : setBalloonTop3(410),
            10
        );
    }, [balloonTop3]);

    if (blueTeamScore === greenTeamScore) {
        return (
            <MainTile>
                <TitleContainer>
                    <h4>It is a draw!</h4>
                </TitleContainer>
            </MainTile>
        );
    }

    return (
        <>
            <MainTile>
                <TitleContainer>
                    The <Badge variant={blueTeamScore > greenTeamScore ? "primary" : "success"}>{winnerTeam}</Badge> has
                    won!
                </TitleContainer>
                <ResultsContainer>
                    <Badge variant="primary"> {blueTeamScore} </Badge> :
                    <Badge variant="success"> {greenTeamScore} </Badge>
                </ResultsContainer>
                {iAmWinner && <TitleContainer>Congratulations! </TitleContainer>}
            </MainTile>
            {iAmWinner && (
                <>
                    <Balloon balloonTop={balloonTop1} left="20" />
                    <Balloon balloonTop={balloonTop2} left="47" />
                    <Balloon balloonTop={balloonTop3} left="73" />
                </>
            )}
        </>
    );
}
