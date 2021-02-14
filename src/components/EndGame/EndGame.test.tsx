import React from "react";
import { render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import EndGame from "./EndGame";

const mockStore = configureMockStore([thunk]);
const storeWithBlueWinner = mockStore({
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
        ownTeam: "greenTeam",
        players: ["fake_player", "fake_gameMaster", "fake_player2", "fake_player3"],
        round: 1,
        teamOnTurn: "greenTeam",
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
        ownTeam: "greenTeam",
        players: ["fake_player", "fake_gameMaster", "fake_player2", "fake_player3"],
        round: 1,
        teamOnTurn: "greenTeam",
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
        const elementCongrats = queryByTestId("congratulations");
        const elementBalloon = queryByTestId("balloon");
        expect(elementDraw).not.toBeNull();
        expect(elementCongrats).toBeNull();
        expect(elementBalloon).toBeNull();
    });
    it("shows the right messages for the winner", async () => {
        const { queryByTestId, getByTestId } = render(
            <Provider store={storeWithGreenWinner}>
                <EndGame />
            </Provider>
        );

        const elementDraw = queryByTestId("draw");
        const elementCongrats = queryByTestId("congratulations");
        const elementWinner = await screen.findByText("green team");
        const blueScore = getByTestId("blue-score");
        const greenScore = getByTestId("green-score");
        const elementBalloon = queryByTestId("balloon");
        expect(elementCongrats).not.toBeNull();
        expect(elementDraw).toBeNull();
        expect(elementWinner).not.toBeNull();
        expect(blueScore.textContent).toContain(35);
        expect(greenScore.textContent).toContain(55);
        expect(elementBalloon).not.toBeNull();
    });
    it("shows the right messages for the loser", async () => {
        const { queryByTestId, getByTestId } = render(
            <Provider store={storeWithBlueWinner}>
                <EndGame />
            </Provider>
        );

        const elementDraw = queryByTestId("It is a draw!");
        const elementCongrats = queryByTestId("congratulations");
        const elementWinner = await screen.findByText("blue team");
        const blueScore = getByTestId("blue-score");
        const greenScore = getByTestId("green-score");
        const elementBalloon = queryByTestId("balloon");
        expect(elementDraw).toBeNull();
        expect(elementCongrats).toBeNull();
        expect(elementWinner).not.toBeNull();
        expect(blueScore.textContent).toContain(55);
        expect(greenScore.textContent).toContain(35);
        expect(elementBalloon).toBeNull();
    });
});
