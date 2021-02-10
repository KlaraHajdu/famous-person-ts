import React from "react";
import { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { ReactComponent as Balloon } from "../../static/1524086080.svg";
import { useSelector } from "react-redux";
import { selectBlueTeamScore, selectGreenTeamScore, selectOwnTeam } from "../../store/slices/game/gameSelector";
import { MainTile } from "../../Theme/theme";

export default function EndGame() {
    const [winnerTeam, setWinnerTeam] = useState<string>("");
    const [iAmWinner, setIAmWinner] = useState<boolean | null>(null);
    const [balloonTop1, setBalloonTop1] = useState(410);
    const [balloonTop2, setBalloonTop2] = useState(390);
    const [balloonTop3, setBalloonTop3] = useState(410);
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
    }, [winnerTeam]);

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
            <MainTile style={{ zIndex: "0" }}>
                <h4 style={{ alignSelf: "center", textAlign: "center", flex: 1 }}>("It is a draw!")</h4>
            </MainTile>
        );
    }

    if (iAmWinner) {
        return (
            <div>
                <React.Fragment>
                    <h4 style={{ alignSelf: "center", textAlign: "center", flex: 1 }}>
                        {" "}
                        The{" "}
                        <Badge
                            variant={blueTeamScore > greenTeamScore ? "primary" : "success"}
                            // style={{ topPadding: 20, alignSelf: "center", textAlign: "center", flex: 1 }}
                        >
                            {winnerTeam}
                        </Badge>{" "}
                        has won!
                    </h4>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                        <Badge variant="primary" style={{ marginRight: 3 }}>
                            {" "}
                            {blueTeamScore}
                        </Badge>{" "}
                        :{" "}
                        <Badge variant="success" style={{ marginLeft: 3 }}>
                            {" "}
                            {greenTeamScore}
                        </Badge>{" "}
                    </div>
                </React.Fragment>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 30 }}>
                    <React.Fragment>
                        <h3>Congratulations!</h3>
                        <div>
                            <Balloon
                                id="balloon1"
                                // style={{
                                //     top: `${balloonTop1}`,
                                //     height: "300",
                                //     position: "absolute",
                                //     zIndex: "1",
                                //     left: "20%",
                                //     width: "120",
                                // }}
                            />
                            <Balloon
                                id="balloon2"
                                // style={{
                                //     top: `${balloonTop2}`,
                                //     height: "300",
                                //     position: "absolute",
                                //     zIndex: "1",
                                //     left: "47%",
                                //     width: "120",
                                // }}
                            />
                            <Balloon
                                id="balloon3"
                                // style={{
                                //     top: `${balloonTop3}`,
                                //     height: "300",
                                //     position: "absolute",
                                //     zIndex: "1",
                                //     left: "73%",
                                //     width: "120",
                                // }}
                            />
                        </div>
                    </React.Fragment>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <h4 style={{ alignSelf: "center", textAlign: "center", flex: 1 }}>
                {" "}
                The{" "}
                <Badge
                    variant={blueTeamScore > greenTeamScore ? "primary" : "success"}
                    // style={{ topPadding: 20, alignSelf: "center", textAlign: "center", flex: 1 }}
                >
                    {winnerTeam}
                </Badge>{" "}
                has won!
            </h4>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                <Badge variant="primary" style={{ marginRight: 3 }}>
                    {" "}
                    {blueTeamScore}
                </Badge>{" "}
                :{" "}
                <Badge variant="success" style={{ marginLeft: 3 }}>
                    {" "}
                    {greenTeamScore}
                </Badge>{" "}
            </div>
        </React.Fragment>
    );
}
