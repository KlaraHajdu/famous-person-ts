import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";
import { useSelector, useDispatch } from "react-redux";
import {
    selectBluePlayerIndex,
    selectBlueTeam,
    selectGreenPlayerIndex,
    selectGreenTeam,
    selectTeamOnTurn,
} from "../../store/slices/game/gameSelector";
import { asyncGameActions } from "../../store/slices/game/slice";
import IndexType from "../../types/IndexType";
import TeamType from "../../types/TeamType";
import { Container } from "./styled";

type DeletePlayerProps = {
    playerOnTurn: string;
    handleClosing: () => void;
};

export default function DeletePlayer(props: DeletePlayerProps) {
    const { playerOnTurn } = props;
    const teamOnTurn = useSelector(selectTeamOnTurn);
    const blueTeam = useSelector(selectBlueTeam);
    const greenTeam = useSelector(selectGreenTeam);
    const greenPlayerIndex = useSelector(selectGreenPlayerIndex);
    const bluePlayerIndex = useSelector(selectBluePlayerIndex);
    const dispatch = useDispatch();
    let dialog = useRef<Dialog>();

    Dialog.setOptions({
        defaultOkLabel: "Yes!",
        defaultCancelLabel: "Cancel",
        primaryClassName: "btn-warning",
    });

    const deletePlayer = async (player: string) => {
        if (teamOnTurn === TeamType.BlueTeam) {
            if (bluePlayerIndex === blueTeam.length - 1) {
                dispatch(asyncGameActions.updatePlayerIndex({ teamIndex: IndexType.BluePlayerIndex, nextIndex: 0 }));
            }
            const reducedTeam = blueTeam.filter((pl: string) => pl !== player);
            dispatch(asyncGameActions.deletePlayer({ team: TeamType.BlueTeam, players: reducedTeam }));
        } else {
            if (greenPlayerIndex === greenTeam.length - 1) {
                dispatch(asyncGameActions.updatePlayerIndex({ teamIndex: IndexType.GreenPlayerIndex, nextIndex: 0 }));
            }
            const reducedTeam = greenTeam.filter((pl: string) => pl !== player);
            dispatch(asyncGameActions.deletePlayer({ team: TeamType.GreenTeam, players: reducedTeam }));
        }
        props.handleClosing();
    };

    const confirmPlayerDelete = () => {
        (dialog as any).show({
            body: `Are you sure you want to delete ${playerOnTurn}?`,
            actions: [
                Dialog.CancelAction(() => {
                    props.handleClosing();
                }),
                Dialog.OKAction(() => {
                    deletePlayer(playerOnTurn);
                }),
            ],
            bsSize: "small",
            onHide: (dialog: Dialog) => {
                dialog.hide();
            },
        });
    };

    return (
        <Container>
            <Button onClick={props.handleClosing} variant="info">
                Cancel
            </Button>
            <Button onClick={confirmPlayerDelete} variant="danger">
                Delete Player
            </Button>
            <Dialog
                ref={(component) => {
                    if (component) {
                        (dialog as any) = component;
                    }
                }}
            />
        </Container>
    );
}
