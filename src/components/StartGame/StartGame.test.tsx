import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import StartGame from "./StartGame";

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

jest.mock("../../services/FirebaseRD/fbDatabase.ts");

describe("StartGame component", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <StartGame />
            </Provider>
        );
    });
    it("shows helper text when name is too long", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <StartGame />
            </Provider>
        );

        const nameInput = getByTestId("start-name-input");
        await userEvent.type(nameInput, "Naaaammmeeeeeeeeeeeeeeeeeee");

        const helperTextField = getByTestId("helper-text");
        expect(helperTextField.textContent).toEqual("Name too long!");
    });
    it("shows helper text when name is empty", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <StartGame />
            </Provider>
        );

        const nameInput = getByTestId("start-name-input");
        await userEvent.type(nameInput, "Na");
        await userEvent.clear(nameInput);

        const helperTextField = getByTestId("helper-text");
        expect(helperTextField.textContent).toEqual("Name cannot be empty!");
    });
    it("dispatches an action to check gameId when name given", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <StartGame />
            </Provider>
        );

        const nameInput = getByTestId("start-name-input");
        await userEvent.type(nameInput, "master");
        const startButton = getByTestId("submit-button");
        await userEvent.click(startButton);
        let actions: any;

        actions = store.getActions();
        expect(actions[0].type).toEqual("game/checkifgameidexists/pending");
    });
   
});
