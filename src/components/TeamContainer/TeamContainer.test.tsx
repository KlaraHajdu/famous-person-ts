import React from "react";
import { render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import TeamContainer from "./TeamContainer";
import TeamType from "../../types/TeamType";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    game: {
        greenTeamScore: 34,
        blueTeamScore: 23,
        greenTeam: ["fake_green_player", "fake_green_gameMaster", "fake_green_player5"],
        blueTeam: ["fake_blue_player2", "fake_blue_player3", "fake_blue_player6"],
    },
});

describe("TeamContainer component", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <TeamContainer team={TeamType.GreenTeam} />
            </Provider>
        );
    });
    it("shows the players correctly", async () => {
        render(
            <Provider store={store}>
                <TeamContainer team={TeamType.GreenTeam} />
            </Provider>
        );

        const player1 = await screen.findByText(/fake_green_player/i);
        expect(player1).not.toBeNull();
        const player2 = await screen.findByText(/fake_green_gameMaster/i);
        expect(player2).not.toBeNull();
        const player3 = await screen.findByText(/fake_green_player5/i);
        expect(player3).not.toBeNull();
    });
    it("shows the score correctly", async () => {
        render(
            <Provider store={store}>
                <TeamContainer team={TeamType.GreenTeam} />
            </Provider>
        );

        const greenTeamScore = await screen.findByText(/34/);
        expect(greenTeamScore).not.toBeNull();
    });
});
