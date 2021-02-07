import React from "react";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { selectGameId, selectGameMaster, selectOwnName } from "../../store/slices/game/gameSelector";

type propsType = {
    title: string;
    subtitle: string;
};

export default function PhaseHeader({ title, subtitle}: propsType) {
    const ownName = useSelector(selectOwnName);
    const gameId = useSelector(selectGameId);
    const gameMaster = useSelector(selectGameMaster);

    return (
        <div>
            <h4>Hello {ownName}!</h4>
            <Row>
                <Col>
                    <h6>
                        Game Id:{" "}
                        <Badge variant="secondary" style={{}}>
                            {gameId}
                        </Badge>{" "}
                    </h6>
                </Col>
                <Col>
                    <h6>Game master: {gameMaster} </h6>
                </Col>
            </Row>
            <hr />
            <h3>{title}</h3>
            <h3>{subtitle}</h3>
            <hr />
        </div>
    );
}
