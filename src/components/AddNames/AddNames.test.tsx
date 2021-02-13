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
            greenTeam: ["name"],
            blueTeam: ["name2", "name3"],
        },
        round1Names: null,
        round2Names: null,
        round3Names: null,
    },
});

jest.mock("../../services/FirebaseRD/fbDatabase.ts");

jest.mock("../../constants", () => ({
    CONSTANTS: {
        NUMBER_OF_NAMES_TO_START_GAME: 4,
        ROUND_LENGTH: 3,
    },
}));

jest.mock("../NameInputForm/NameInputForm", () => {
    return function Dummy() {
        return <div></div>;
    };
});
jest.mock("../PhaseHeader/PhaseHeader", () => {
    return function Dummy() {
        return <div></div>;
    };
});
jest.mock("../TeamContainer/TeamContainer", () => {
    return function Dummy() {
        return <div></div>;
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
});
