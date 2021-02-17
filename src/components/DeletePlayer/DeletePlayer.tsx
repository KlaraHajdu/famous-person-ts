import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";
import { useSelector, useDispatch } from "react-redux";
import {
    selectBluePlayerIndex,
    selectBlueTeam,
    selectGameMaster,
    selectGreenPlayerIndex,
    selectGreenTeam,
} from "../../store/slices/game/gameSelector";
import { asyncGameActions } from "../../store/slices/game/slice";
import { StyledTable, StyledTd } from "./styled";

export default function DeletePlayer(props: any) {
    const greenTeam = useSelector(selectGreenTeam);
    const blueTeam = useSelector(selectBlueTeam);
    const greenPlayerIndex = useSelector(selectGreenPlayerIndex);
    const bluePlayerIndex = useSelector(selectBluePlayerIndex);
    const gameMaster = useSelector(selectGameMaster);
    const [filteredGreenPlayers, setFilteredGreenPlayers] = useState<string[]>([]);
    const [filteredBluePlayers, setFilteredBluePlayers] = useState<string[]>([]);
    const dispatch = useDispatch();
    let dialog = useRef<Dialog>();

    Dialog.setOptions({
        defaultOkLabel: "Yes!",
        defaultCancelLabel: "Cancel",
        primaryClassName: "btn-warning",
    });

    const deleteBluePlayer = (player: string) => {
        if (blueTeam.indexOf(player) < bluePlayerIndex) {
            dispatch(asyncGameActions.updatePlayerIndex({ team: "blueTeam", change: -1 }));
        }
        let reducedTeam = blueTeam.filter((pl: string) => pl !== player);
        dispatch(asyncGameActions.deletePlayer({ team: "blueTeam", players: reducedTeam }));
        props.handleClosing();
    };

    const confirmBluePlayerDelete = (player: string) => {
        (dialog as any).show({
            body: `Are you sure you want to delete ${player}?`,
            actions: [
                Dialog.CancelAction(() => {
                    props.handleClosing();
                }),
                Dialog.OKAction(() => {
                    deleteBluePlayer(player);
                }),
            ],
            bsSize: "small",
            onHide: (dialog: Dialog) => {
                dialog.hide();
            },
        });
    };

    const deleteGreenPlayer = (player: string) => {
        if (greenTeam.indexOf(player) < greenPlayerIndex) {
            dispatch(asyncGameActions.updatePlayerIndex({ team: "greenTeam", change: -1 }));
        } else if (greenTeam.indexOf(player) === greenPlayerIndex && greenPlayerIndex === greenTeam.length) {
            dispatch(asyncGameActions.updatePlayerIndex({ team: "greenTeam", change: 1 }));
        }
        let reducedTeam: string[] = greenTeam.filter((pl: string) => pl !== player);
        dispatch(asyncGameActions.deletePlayer({ team: "greenTeam", players: reducedTeam }));
        props.handleClosing();
    };

    const confirmGreenPlayerDelete = (player: string) => {
        (dialog as any).show({
            body: `Are you sure you want to delete ${player}?`,
            actions: [
                Dialog.CancelAction(() => {
                    props.handleClosing();
                }),
                Dialog.OKAction(() => {
                    deleteGreenPlayer(player);
                }),
            ],
            bsSize: "small",
            onHide: (dialog: Dialog) => {
                dialog.hide();
            },
        });
    };

    useEffect(() => {
        if (greenTeam.length > 2) {
            setFilteredGreenPlayers(greenTeam.filter((player: string) => player !== gameMaster));
        }
        if (blueTeam.length > 2) {
            setFilteredBluePlayers(blueTeam.filter((player: string) => player !== gameMaster));
        }
    }, [blueTeam, gameMaster, greenTeam]);

    return (
        <>
            <StyledTable striped bordered size="sm">
                <tbody>
                    {filteredGreenPlayers &&
                        filteredGreenPlayers.map((player, index) => {
                            return (
                                <tr key={index}>
                                    <td> {player}</td>
                                    <StyledTd>
                                        <Button variant="danger" onClick={() => confirmGreenPlayerDelete(player)}>
                                            Delete
                                        </Button>
                                    </StyledTd>
                                </tr>
                            );
                        })}
                    {filteredBluePlayers &&
                        filteredBluePlayers.map((player, index) => {
                            return (
                                <tr key={index}>
                                    <td> {player}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => confirmBluePlayerDelete(player)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </StyledTable>
            <Button onClick={props.handleClosing} variant="info">
                Cancel
            </Button>
            <Dialog
                ref={(component) => {
                    if (component) {
                        (dialog as any) = component;
                    }
                }}
            />
        </>
    );
}
