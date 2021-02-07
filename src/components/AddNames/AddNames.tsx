import React, { useEffect } from "react";
import NameInputForm from "../NameInputForm/NameInputForm";
import PhaseHeader from "../PhaseHeader/PhaseHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TeamContainer from "../TeamContainer/TeamContainer";
import { MiddleContainerInThreeColumns } from "./styled";
import { useSelector } from "react-redux";

function AddNames() {
    const NUMBER_OF_NAMES_TO_START_GAME = 2;


    // useEffect(() => {
    //     const actAfterSettingPlayGamePhase = (err) => {
    //         if (!!err) {
    //             console.log(err);
    //         } else {
    //             console.log("Play game phase was set successfully in db");
    //         }
    //     };

    //     const setPlayGamePhaseInDB = () => {
    //         appFirebase.databaseApi.update(
    //             `games/${game.gameId}`,
    //             { gamePhase: "playGame" },
    //             actAfterSettingPlayGamePhase
    //         );
    //     };

    //     const handleNamesResult = (snapshot) => {
    //         if (snapshot.val()) {
    //             if (Object.keys(snapshot.val()).length === NUMBER_OF_NAMES_TO_START_GAME) {
    //                 setPlayGamePhaseInDB();
    //             }
    //         }
    //     };

    //     const followHowManyNamesAdded = () => {
    //         appFirebase.databaseApi.readOn(`games/${game.gameId}/names`, handleNamesResult);
    //     };

    //     if (game.ownName === game.gameMaster) followHowManyNamesAdded();
    // }, []);

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
