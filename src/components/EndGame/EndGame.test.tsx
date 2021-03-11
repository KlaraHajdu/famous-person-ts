import React from "react";
import { render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import TeamType from "../../types/TeamType";
import EndGame from "./EndGame";

const mockStore = configureMockStore([thunk]);
const storeWithBlueWinner = mockStore({
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
        blueTeamScore: 55,
        greenTeamScore: 35,
        greenTeam: ["fake_player", "fake_gameMaster"],
        blueTeam: ["fake_player2", "fake_player3"],
        names: {
            greenTeam: ["name"],
            blueTeam: ["name2", "name3"],
        },
        round1Names: [],
        round2Names: [],
        round3Names: [],
    },
});

const storeWithGreenWinner = mockStore({
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
        blueTeamScore: 35,
        greenTeamScore: 55,
        greenTeam: ["fake_player", "fake_gameMaster"],
        blueTeam: ["fake_player2", "fake_player3"],
        names: {
            greenTeam: ["name"],
            blueTeam: ["name2", "name3"],
        },
        round1Names: [],
        round2Names: [],
        round3Names: [],
    },
});

const storeWithDraw = mockStore({
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
        blueTeamScore: 45,
        greenTeamScore: 45,
        greenTeam: ["fake_player", "fake_gameMaster"],
        blueTeam: ["fake_player2", "fake_player3"],
        names: {
            greenTeam: ["name"],
            blueTeam: ["name2", "name3"],
        },
        round1Names: [],
        round2Names: [],
        round3Names: [],
    },
});

describe("EndGame component", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={storeWithBlueWinner}>
                <EndGame />
            </Provider>
        );
    });
    it("shows the right messages when it is a draw", async () => {
        const { queryByTestId } = render(
            <Provider store={storeWithDraw}>
                <EndGame />
            </Provider>
        );

        const elementDraw = await screen.findByText("It is a draw!");
        expect(elementDraw).not.toBeNull();
        const elementCongrats = queryByTestId("congratulations");
        expect(elementCongrats).toBeNull();
        const elementBalloon = queryByTestId("balloon");
        expect(elementBalloon).toBeNull();
    });
    it("shows the right messages for the winner", async () => {
        const { queryByTestId, getByTestId } = render(
            <Provider store={storeWithGreenWinner}>
                <EndGame />
            </Provider>
        );

        const elementDraw = queryByTestId("draw");
        expect(elementDraw).toBeNull();
        const elementCongrats = queryByTestId("congratulations");
        expect(elementCongrats).not.toBeNull();
        const elementWinner = await screen.findByText("green team");
        expect(elementWinner).not.toBeNull();
        const blueScore = getByTestId("blue-score");
        expect(blueScore.textContent).toContain(35);
        const greenScore = getByTestId("green-score");
        expect(greenScore.textContent).toContain(55);
        const elementBalloon = queryByTestId("balloon");
        expect(elementBalloon).not.toBeNull();
    });
    it("shows the right messages for the loser", async () => {
        const { queryByTestId, getByTestId } = render(
            <Provider store={storeWithBlueWinner}>
                <EndGame />
            </Provider>
        );

        const elementDraw = queryByTestId("It is a draw!");
        expect(elementDraw).toBeNull();
        const elementCongrats = queryByTestId("congratulations");
        expect(elementCongrats).toBeNull();
        const elementWinner = await screen.findByText("blue team");
        expect(elementWinner).not.toBeNull();
        const blueScore = getByTestId("blue-score");
        expect(blueScore.textContent).toContain(55);
        const greenScore = getByTestId("green-score");
        expect(greenScore.textContent).toContain(35);
        const elementBalloon = queryByTestId("balloon");
        expect(elementBalloon).toBeNull();
    });
});
