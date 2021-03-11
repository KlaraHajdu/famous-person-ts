import React from "react";
import { render } from "@testing-library/react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import TeamType from "../../types/TeamType";
import WaitingRoom from "./WaitingRoom";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    game: {
        gameId: 1111,
        ownName: "fake_gameMaster",
        gameMaster: "fake_gameMaster",
        ownTeam: TeamType.GreenTeam,
        players: ["fake_player", "fake_gameMaster", "fake_player2", "fake_player3"],
        round: 1,
        teamOnTurn: TeamType.GreenTeam,
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
        round1Names: null,
        round2Names: null,
        round3Names: null,
    },
});
describe("WaitingRoom component", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <WaitingRoom />
            </Provider>
        );
    });
});
