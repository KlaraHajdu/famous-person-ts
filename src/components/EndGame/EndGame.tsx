import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectBlueTeamScore, selectGreenTeamScore, selectOwnTeam } from "../../store/slices/game/gameSelector";
import TeamType from "../../types/TeamType";
import { StyledBalloon as Balloon, StyledBadge as Badge, MainTile, ResultsContainer, TitleContainer } from "./styled";

export default function EndGame() {
    const [isWinner, setIsWinner] = useState<boolean | null>(null);
    const [balloonTop1, setBalloonTop1] = useState<number>(410);
    const [balloonTop2, setBalloonTop2] = useState<number>(390);
    const [balloonTop3, setBalloonTop3] = useState<number>(410);
    const blueTeamScore = useSelector(selectBlueTeamScore);
    const greenTeamScore = useSelector(selectGreenTeamScore);
    const ownTeam = useSelector(selectOwnTeam);
    const winnerTeam: string = blueTeamScore > greenTeamScore? "blue team" : "green team";


    useEffect(() => {
        if (ownTeam === TeamType.GreenTeam && winnerTeam === "green team") {
            setIsWinner(true);
        } else if (ownTeam === TeamType.BlueTeam && winnerTeam === "blue team") {
            setIsWinner(true);
        } else {
            setIsWinner(false);
        }
    }, [ownTeam, winnerTeam]);

    useEffect(() => {
        let unmounted = false;
        let balloonTimeout: NodeJS.Timeout;

        if (!unmounted) {
            const balloonsList: {
                balloontop: number;
                balloonTopSetter: React.Dispatch<React.SetStateAction<number>>;
                speed: number;
            }[] = [
                { balloontop: balloonTop1, balloonTopSetter: setBalloonTop1, speed: 3.5 },
                { balloontop: balloonTop2, balloonTopSetter: setBalloonTop2, speed: 5 },
                { balloontop: balloonTop3, balloonTopSetter: setBalloonTop3, speed: 4 },
            ];
            balloonTimeout = setTimeout(() => {
                balloonsList.forEach((balloon) => {
                    if (balloon.balloontop < -280) {
                        balloon.balloonTopSetter(410);
                    } else if (balloon.balloontop > 405) {
                        balloon.balloonTopSetter(balloon.balloontop - 1);
                    } else {
                        balloon.balloonTopSetter(balloon.balloontop - balloon.speed);
                    }
                });
            }, 10);
        }
        return () => {
            clearTimeout(balloonTimeout);
            unmounted = true;
        };
    }, [balloonTop1, balloonTop2, balloonTop3]);

    if (blueTeamScore === greenTeamScore) {
        return (
            <MainTile>
                <TitleContainer>
                    <h4 data-testid="draw">It is a draw!</h4>
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
                    <Badge variant="primary" data-testid="blue-score">
                        {" "}
                        {blueTeamScore}{" "}
                    </Badge>{" "}
                    :
                    <Badge variant="success" data-testid="green-score">
                        {" "}
                        {greenTeamScore}{" "}
                    </Badge>
                </ResultsContainer>
                {isWinner && <TitleContainer data-testid="congratulations">Congratulations! </TitleContainer>}
            </MainTile>
            {isWinner && (
                <>
                    <Balloon balloontop={balloonTop1} left="20" data-testid="balloon" />
                    <Balloon balloontop={balloonTop2} left="47" />
                    <Balloon balloontop={balloonTop3} left="73" />
                </>
            )}
        </>
    );
}
