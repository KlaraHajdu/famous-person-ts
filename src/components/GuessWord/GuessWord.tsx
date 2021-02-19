import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { selectAllWordsInRound, selectOwnTeam, selectRound } from "../../store/slices/game/gameSelector";
import { asyncGameActions } from "../../store/slices/game/slice";
import DeleteDuplicateWord from "../DeleteDuplicateWord/DeleteDuplicateWord";
import { WordBadge, Container, WordContainer, DuplicateContainer } from "./styled";

export default function GuessWord(props: any) {
    const [word, setWord] = useState<string | undefined>();
    const [buttonActive, setButtonActive] = useState(true);
    const ownTeam = useSelector(selectOwnTeam);
    const round = useSelector(selectRound);
    const [wordDeleted, setWordDeleted] = useState(0);
    const allWordsInRound = useSelector(selectAllWordsInRound);
    const dispatch = useDispatch();
    const endRoundProps = props.endRound;

    const scoreWordGuessed = () => {
        if (buttonActive && word) {
            setButtonActive(false);
            dispatch(asyncGameActions.deleteWordFromRound(word));
            dispatch(asyncGameActions.updateScore(ownTeam));
        }
    };

    const getNewWord = () => {
        setWordDeleted(wordDeleted + 1);
    };

    useEffect(() => {
        let buttonEnableTimeout: NodeJS.Timeout;
        if (!buttonActive) {
            buttonEnableTimeout = setTimeout(() => setButtonActive(true), 1500);
        }

        return () => {
            clearTimeout(buttonEnableTimeout);
        };
    }, [buttonActive]);

    useEffect(() => {
        if (allWordsInRound.length === 0) {
            endRoundProps();
        }
        const randomId = Math.floor(Math.random() * allWordsInRound.length);
        setWord(allWordsInRound[randomId]);
    }, [allWordsInRound, wordDeleted]);

    return (
        <Container>
            <WordContainer>
                <WordBadge data-testid="word-element">{word}</WordBadge>
                <Button onClick={scoreWordGuessed} data-testid="guessed-word-button">
                    Guessed
                </Button>
            </WordContainer>
            <DuplicateContainer>
                {round === 1 && word && <DeleteDuplicateWord word={word} getNewWord={getNewWord} />}
            </DuplicateContainer>
        </Container>
    );
}
