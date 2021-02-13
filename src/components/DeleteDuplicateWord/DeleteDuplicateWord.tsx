import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";
import { useDispatch } from "react-redux";
import { asyncGameActions } from "../../store/slices/game/slice";
import { Container } from "./styled";

type DeleteDuplicateProps = {
    word: string;
    getNewWord: () => void;
};

export default function DeleteDuplicateWord(props: DeleteDuplicateProps) {
    let dialog = useRef<Dialog>(null);
    const dispatch = useDispatch();

    Dialog.setOptions({
        defaultOkLabel: "Yes!",
        defaultCancelLabel: "Cancel",
        primaryClassName: "btn-warning",
    });

    const deleteDuplicateWord = () => {
        console.group(props.word);
        dispatch(asyncGameActions.deleteDuplicateWord(props.word));
    };

    const confirmDeleteWord = () => {
        (dialog as any).show({
            body: `Are you sure you want to delete this word?`,
            actions: [
                Dialog.CancelAction(() => {}),
                Dialog.OKAction(() => {
                    deleteDuplicateWord();
                }),
            ],
            bsSize: "small",
            onHide: (dialog: { hide: () => void }) => {
                dialog.hide();
            },
        });
    };

    return (
        <Container>
            <Button variant="outline-primary" onClick={() => confirmDeleteWord()} data-testid="delete-duplicate-button">
                Delete duplicate
            </Button>
            <Dialog
                ref={(component) => {
                    if (component !== null) {
                        (dialog as any) = component;
                    }
                }}
            />
        </Container>
    );
}
