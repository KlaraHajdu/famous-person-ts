import React from "react";
import { render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import NameInputForm from "./NameInputForm";
import userEvent from "@testing-library/user-event";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    game: {
        gameId: 1111,
        ownName: "fake_gameMaster",
        gameMaster: "fake_gameMaster",
        ownTeam: "greenTeam",
        players: ["fake_player", "fake_gameMaster", "fake_player2", "fake_player3"],
        greenTeam: ["fake_player", "fake_gameMaster"],
        blueTeam: ["fake_player2", "fake_player3"],
        names: {
            greenTeam: ["name"],
            blueTeam: ["name2", "name3"],
        },
    },
});

const storeFinishedTeam = mockStore({
    game: {
        gameId: 1111,
        ownName: "fake_gameMaster",
        gameMaster: "fake_gameMaster",
        ownTeam: "blueTeam",
        players: ["fake_player", "fake_gameMaster", "fake_player2", "fake_player3"],
        greenTeam: ["fake_player", "fake_gameMaster"],
        blueTeam: ["fake_player2", "fake_player3"],
        names: {
            greenTeam: ["name"],
            blueTeam: ["name2", "name3"],
        },
    },
});

describe("NameInputForm component", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <NameInputForm numberOfNames={4} />
            </Provider>
        );
    });
    it("shows helper text when name is too long", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <NameInputForm numberOfNames={4} />
            </Provider>
        );

        const helperText = getByTestId("helper-text");
        expect(helperText.textContent).toEqual("");

        const input = getByTestId("name-input");
        await userEvent.type(input, "Naaaaaaaaaaameeee naaaaammeeeeeeeee");

        expect(helperText.textContent).toEqual("Name too long!");
    });
    it("shows helper text when name is empty", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <NameInputForm numberOfNames={4} />
            </Provider>
        );

        const helperText = getByTestId("helper-text");
        expect(helperText.textContent).toEqual("");

        const input = getByTestId("name-input");
        await userEvent.type(input, "Na");
        await userEvent.clear(input);

        expect(helperText.textContent).toEqual("Please give a name!");
    });
    it("dispatches right action when helper text is null and user clicks submit button", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <NameInputForm numberOfNames={4} />
            </Provider>
        );
        const input = getByTestId("name-input");
        await userEvent.type(input, "Name");
        const submitButton = getByTestId("submit-name");
        await userEvent.click(submitButton);

        const actions = store.getActions();
        expect(actions[0].type).toEqual("game/checkifnameexists/pending");
    });
    it("shows the right number of all submitted names and the own team's submitted names", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <NameInputForm numberOfNames={4} />
            </Provider>
        );
        const ownTeamNames = getByTestId("own-team-names");
        const allNamesToSubmit = getByTestId("all-names");
        expect(ownTeamNames.textContent).toContain(1);
        expect(allNamesToSubmit.textContent).toContain(2);
    });
    it("shows the right message when the team has submitted enough names", async () => {
        render(
            <Provider store={storeFinishedTeam}>
                <NameInputForm numberOfNames={4} />
            </Provider>
        );

        const message = await screen.findByText(/Please wait for the other team/i);
        expect(message).not.toBeNull();
    });
});
