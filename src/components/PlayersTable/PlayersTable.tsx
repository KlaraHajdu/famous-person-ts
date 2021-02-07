import React from "react";
import Table from "react-bootstrap/Table";

type PlayersType = {
    title: string;
    players: string[];
};

export default function PlayersTable({ title, players }: PlayersType) {
    return (
        <Table striped bordered hover variant={"dark"}>
            <thead>
                <tr>
                    <th>{title}</th>
                </tr>
            </thead>
            {players && (
                <tbody>
                    {players.map((player, index) => (
                        <tr key={index}>
                            <td>{player}</td>
                        </tr>
                    ))}
                </tbody>
            )}
        </Table>
    );
}
