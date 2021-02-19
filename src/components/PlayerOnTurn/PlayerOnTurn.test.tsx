import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import PlayerOnTurn from "./PlayerOnTurn";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    game: {
        gameId: 1111,
        ownName: "fake_player",
        gameMaster: "fake_gameMaster",
        ownTeam: "greenTeam",
        players: ["fake_player", "fake_gameMaster", "fake_player2", "fake_player3", "fake_player5", "fake_player6"],
        round: 1,
        teamOnTurn: "greenTeam",
        greenPlayerIndex: 0,
        bluePlayerIndex: 0,
        turnOngoing: false,
        blueTeamScore: 0,
        greenTeamScore: 0,
        greenTeam: ["fake_player", "fake_gameMaster", "fake_player5"],
        blueTeam: ["fake_player2", "fake_player3", "fake_player6"],
        names: {
            greenTeam: ["name", "name4"],
            blueTeam: ["name2", "name3"],
        },
        round1Names: ["word", "word1", "word2", "word3"],
        round2Names: ["word", "word1", "word2", "word3"],
        round3Names: ["word", "word1", "word2", "word3"],
    },
});

jest.mock("../../constants", () => ({
    CONSTANTS: {
        NUMBER_OF_NAMES_TO_START_GAME: 4,
        ROUND_LENGTH: 2,
    },
}));

jest.mock("../GuessWord/GuessWord", () => {
    return function Dummy(props: any) {
        return <div data-testid="guessed-word-button"></div>;
    };
});

describe("PlayerOnTurn component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions();
    });

    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <PlayerOnTurn />
            </Provider>
        );
    });
    it("shows the guessed word button if the player starts the turn", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <PlayerOnTurn />
            </Provider>
        );

        const button = getByTestId("start-turn-button");
        await userEvent.click(button);

        const guessedButton = getByTestId("guessed-word-button");
        expect(guessedButton).not.toBeNull();
    });
    it("does not show the guessed word button until the player starts the turn", async () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <PlayerOnTurn />
            </Provider>
        );

        const guessedButton = queryByTestId("guessed-word-button");
        expect(guessedButton).toBeNull();
    });
    it("dispatches turnOngoing action when the turn is started", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <PlayerOnTurn />
            </Provider>
        );

        const button = getByTestId("start-turn-button");
        await userEvent.click(button);

        const actions = store.getActions();
        expect(actions[0].type).toEqual("game/updateturnongoing/pending");
    });
});
