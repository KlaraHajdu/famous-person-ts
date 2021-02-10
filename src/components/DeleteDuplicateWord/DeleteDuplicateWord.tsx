import React, { useRef, MutableRefObject } from "react";
import { Button, Col } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";
import { useSelector } from "react-redux";

export default function DeletePlayer(props: any) {
    let dialog = useRef<Dialog>(null); // works???

    Dialog.setOptions({
        defaultOkLabel: "Yes!",
        defaultCancelLabel: "Cancel",
        primaryClassName: "btn-warning",
    });

    // const wordDeleteDone = (err) => {
    //     if (!!err) console.log(err);
    //     else {
    //         console.log("Word deleted");
    //         props.getNewWord();
    //     }
    // };

    // const wordDeleteDone2_3 = (err) => {
    //     if (!!err) console.log(err);
    // };

    // const deleteWordRound1 = (snapshot) => {
    //     let words;
    //     if (snapshot.val() !== null) {
    //         words = Object.keys(snapshot.val());
    //     }
    //     let wordFiltered = words.filter((word) => {
    //         return word !== props.wordToDelete;
    //     });
    //     let wordFilteredObject = {};
    //     wordFiltered.forEach((word) => (wordFilteredObject[word] = true));

    //     let updateO = { round1: wordFilteredObject };
    //     appFirebase.databaseApi.update(`games/${game.gameId}/`, updateO, (err) => wordDeleteDone(err));

    //     getAllWordsRound2_3();
    // };

    const getAllWordsRound1 = () => {
        //     appFirebase.databaseApi.readOnce(`games/${game.gameId}/round1`, deleteWordRound1);
    };

    // const deleteWordRound2_3 = (snapshot) => {
    //     let words;
    //     if (snapshot.val() !== null) {
    //         words = Object.keys(snapshot.val());
    //     }
    //     let wordFiltered = words.filter((word) => {
    //         return word !== props.wordToDelete;
    //     });
    //     let wordFilteredObject = {};
    //     wordFiltered.forEach((word) => (wordFilteredObject[word] = true));

    //     let updateO2 = { round2: wordFilteredObject };
    //     appFirebase.databaseApi.update(`games/${game.gameId}/`, updateO2, (err) => wordDeleteDone2_3(err));
    //     let updateO3 = { round3: wordFilteredObject };
    //     appFirebase.databaseApi.update(`games/${game.gameId}/`, updateO3, (err) => wordDeleteDone2_3(err));
    // };

    // const getAllWordsRound2_3 = () => {
    //     appFirebase.databaseApi.readOnce(`games/${game.gameId}/round2`, deleteWordRound2_3);
    // };

    const confirmDeleteWord = () => {
        (dialog as any).show({ // as any cast works????
            body: `Are you sure you want to delete this word?`,
            actions: [
                Dialog.CancelAction(() => {}),
                Dialog.OKAction(() => {
                    getAllWordsRound1();
                }),
            ],
            bsSize: "small",
            onHide: (dialog: { hide: () => void }) => {
                dialog.hide();
            },
        });
    };

    return (
        <Col>
            <Button
                variant="outline-primary"
                style={{ height: 36, marginLeft: 20 }}
                onClick={() => confirmDeleteWord()}
            >
                Delete duplicate
            </Button>
            <Dialog
                ref={(component) => {
                    if (component !== null) { // this check works???
                        (dialog as any) = component; // as any cast works????
                    }
                }}
            />
        </Col>
    );
}
