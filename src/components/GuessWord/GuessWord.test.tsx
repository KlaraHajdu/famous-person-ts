import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import GuessWord from "./GuessWord";

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
        round1Names: ["word"],
        round2Names: ["word", "word1", "word2", "word3"],
        round3Names: ["word", "word1", "word2", "word3"],
    },
});

const storeWithNoWords = mockStore({
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
        round1Names: [],
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

const mockEndRound = jest.fn();

describe("GuessWord component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        store.clearActions();
    });

    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <GuessWord />
            </Provider>
        );
    });
    it("shows word to guess on screen", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <GuessWord />
            </Provider>
        );

        const element = getByTestId("word-element");
        expect(element.textContent).toEqual("word");
    });
    it("calls endTurn from props when there are no words left", () => {
        mockEndRound.mockImplementation(() => {});
        render(
            <Provider store={storeWithNoWords}>
                <GuessWord endRound={mockEndRound} />
            </Provider>
        );

        expect(mockEndRound).toHaveBeenCalled();
    });
    it("dispatches actions when word is guessed", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <GuessWord />
            </Provider>
        );

        const guessButton = getByTestId("guessed-word-button");
        await userEvent.click(guessButton);

        const actions = store.getActions();
        expect(actions[0].type).toEqual("game/deletewordfromround/pending");
        expect(actions[1].type).toEqual("game/updatescore/pending");
    });
});
