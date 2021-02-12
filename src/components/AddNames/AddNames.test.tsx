import React from "react";
import { render } from "@testing-library/react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import AddNames from "./AddNames";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    game: {
        gameId: 1111,
        ownName: "fake_gameMaster",
        gameMaster: "fake_gameMaster",
        ownTeam: "greenTeam",
        players: ["fake_player", "fake_gameMaster", "fake_player2", "fake_player3"],
        round: 1,
        teamOnTurn: "greenTeam",
        greenPlayerIndex: 0,
        bluePlayerIndex: 0,
        turnOngoing: false,
        blueTeamScore: 0,
        greenTeamScore: 0,
        greenTeam: ["fake_player", "fake_gameMaster"],
        blueTeam: ["fake_player2", "fake_player3"],
        names: {
            greenTeam: ["name1", "name3"],
            blueTeam: ["name2", "name4"],
        },
        round1Names: null,
        round2Names: null,
        round3Names: null,
    },
});

jest.mock("../../constants", () => {
    return {
        NUMBER_OF_NAMES_TO_START_GAME: 4,
    };
});

describe("AddNames component", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <AddNames />
            </Provider>
        );
    });
    xit("dispatches changeGamePhase actions when required number of names are submitted", async () => {
        render(
            <Provider store={store}>
                <AddNames />
            </Provider>
        );

        const actions = store.getActions();
        expect(actions[0].type).toEqual("gamephase/NEXT_GAMEPHASE_ENTERED");
    });
});
