import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import PlayGame from "./PlayGame";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    game: {
        gameId: 1111,
        ownName: "fake_gameMaster",
        gameMaster: "fake_gameMaster",
        ownTeam: "greenTeam",
        players: ["fake_player", "fake_gameMaster", "fake_player2", "fake_player3", "fake_player5", "fake_player6"],
        round: 1,
        teamOnTurn: "greenTeam",
        greenPlayerIndex: 0,
        bluePlayerIndex: 0,
        turnOngoing: false,
        blueTeamScore: 42,
        greenTeamScore: 48,
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

const storeWith4Players = mockStore({
    game: {
        gameId: 1111,
        ownName: "fake_gameMaster",
        gameMaster: "fake_gameMaster",
        ownTeam: "greenTeam",
        players: ["fake_player", "fake_gameMaster", "fake_player2", "fake_player3", "fake_player5", "fake_player6"],
        round: 2,
        teamOnTurn: "greenTeam",
        greenPlayerIndex: 0,
        bluePlayerIndex: 0,
        turnOngoing: false,
        blueTeamScore: 0,
        greenTeamScore: 0,
        greenTeam: ["fake_player", "fake_gameMaster"],
        blueTeam: ["fake_player2", "fake_player3"],
        names: {
            greenTeam: ["name", "name4"],
            blueTeam: ["name2", "name3"],
        },
        round1Names: ["word", "word1", "word2", "word3"],
        round2Names: ["word", "word1", "word2", "word3"],
        round3Names: ["word", "word1", "word2", "word3"],
    },
});

const storeOfFakePlayer = mockStore({
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
jest.useFakeTimers();

jest.mock("../../constants", () => ({
    CONSTANTS: {
        NUMBER_OF_NAMES_TO_START_GAME: 4,
        ROUND_LENGTH: 2,
    },
}));

describe("PlayGame component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        store.clearActions();
        storeWith4Players.clearActions();
        storeOfFakePlayer.clearActions();
    });
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });
    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <PlayGame />
            </Provider>
        );
    });
    it("shows the team on turn", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <PlayGame />
            </Provider>
        );

        const element = getByTestId("team-on-turn");

        expect(element.textContent).toEqual("green team");
    });
    it("shows the current round", async () => {
        const { findByText } = render(
            <Provider store={store}>
                <PlayGame />
            </Provider>
        );

        const element = await findByText("1st round: Explain in detail");

        expect(element).not.toBeNull();
    });
    it("shows the player on turn", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <PlayGame />
            </Provider>
        );

        const element = getByTestId("player-on-turn");

        expect(element.textContent).toEqual(" fake_player ");
    });
    it("shows the button for deleting player if more than 4 players", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <PlayGame />
            </Provider>
        );

        const element = getByTestId("delete-player-button");

        expect(element).not.toBeNull();
    });
    it("does not show the button for deleting player if only 4 players", () => {
        const { queryByTestId } = render(
            <Provider store={storeWith4Players}>
                <PlayGame />
            </Provider>
        );
        const element = queryByTestId("delete-player-button");

        expect(element).toBeNull();
    });
    it("does not show the button for deleting player if more than 4 players but not game master", () => {
        const { queryByTestId } = render(
            <Provider store={storeOfFakePlayer}>
                <PlayGame />
            </Provider>
        );

        const element = queryByTestId("delete-player-button");

        expect(element).toBeNull();
    });
    it("shows the button for button for starting the turn for the player on turn", () => {
        const { getByTestId } = render(
            <Provider store={storeOfFakePlayer}>
                <PlayGame />
            </Provider>
        );
        const element = getByTestId("start-turn-button");

        expect(element).not.toBeNull();
    });
    it("does not show the button for starting the turn if the player is not on turn", () => {
        const { queryByTestId } = render(
            <Provider store={store}>
                <PlayGame />
            </Provider>
        );

        const element = queryByTestId("start-turn-button");

        expect(element).toBeNull();
    });
    it("does not show the button for deleting duplicate in 2nd round", () => {
        const { queryByTestId } = render(
            <Provider store={storeWith4Players}>
                <PlayGame />
            </Provider>
        );
        const element = queryByTestId("delete-duplicate-button");

        expect(element).toBeNull();
    });
    it("dispatches action to unsubscribe from game at unmount", () => {
        sessionStorage.setItem("blueTeamScore", "23");
        const { unmount } = render(
            <Provider store={store}>
                <PlayGame />
            </Provider>
        );

        unmount();

        const actions = store.getActions();
        expect(actions[0].type).toEqual("game/unsubscribefromgame/pending");
    });
    it("dispatches action to unsubscribe from phase at unmount", () => {
        sessionStorage.setItem("blueTeamScore", "23");
        const { unmount } = render(
            <Provider store={store}>
                <PlayGame />
            </Provider>
        );

        unmount();

        const actions = store.getActions();
        expect(actions[1].type).toEqual("gamephase/unsubscribefromgamephase/pending");
    });
});
