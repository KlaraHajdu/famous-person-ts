import React from "react";
import { useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { selectGameId, selectGameMaster, selectOwnName } from "../../store/slices/game/gameSelector";
import { Subtitle, Title } from "./styled";

type propsType = {
    title: string;
    subtitle: string;
};

export default function PhaseHeader({ title, subtitle }: propsType) {
    const ownName = useSelector(selectOwnName);
    const gameId = useSelector(selectGameId);
    const gameMaster = useSelector(selectGameMaster);

    return (
        <>
            <Title data-testid="own-name">Hello {ownName}!</Title>
            <Row>
                <Col>
                    <h6>
                        Game Id: <Badge variant="secondary" data-testid="gameId">{gameId}</Badge>{" "}
                    </h6>
                </Col>
                <Col>
                    <Subtitle data-testid="game-master">Game master: {gameMaster}</Subtitle>
                </Col>
            </Row>
            <hr />
            <h3 data-testid="title">{title}</h3>
            <h3 data-testid="subtitle">{subtitle}</h3>
            <hr />
        </>
    );
}
