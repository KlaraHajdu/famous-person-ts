import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import WaitingRoomGameMasterPart from "./WaitingRoomGameMaster";
import userEvent from "@testing-library/user-event";

const mockStore = configureMockStore([thunk]);
const storewithTwoPlayers = mockStore({
    game: {
        gameId: 1111,
        ownName: "fake_gameMaster",
        gameMaster: "fake_gameMaster",
        players: ["fake_player", "fake_gameMaster"],
    },
});

const storewithFourPlayers = mockStore({
    game: {
        gameId: 1111,
        ownName: "fake_gameMaster",
        gameMaster: "fake_gameMaster",
        players: ["fake_player", "fake_gameMaster", "fakeplayer2", "fakeplayer3"],
    },
});

describe("WaitingRoomGameMAster component", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={storewithTwoPlayers}>
                <WaitingRoomGameMasterPart />
            </Provider>
        );
    });
    it("does not show form team button with too few players", () => {
        const { queryByTestId } = render(
            <Provider store={storewithTwoPlayers}>
                <WaitingRoomGameMasterPart />
            </Provider>
        );

        const button = queryByTestId("form-team-button");

        expect(button).toBeNull();
    });
    it("shows form team button with enough players", () => {
        const { queryByTestId } = render(
            <Provider store={storewithFourPlayers}>
                <WaitingRoomGameMasterPart />
            </Provider>
        );

        const button = queryByTestId("form-team-button");

        expect(button).toBeVisible();
    });
    it("dispatches action to form team", async () => {
        const { getByTestId } = render(
            <Provider store={storewithFourPlayers}>
                <WaitingRoomGameMasterPart />
            </Provider>
        );

        const button = getByTestId("form-team-button");
        await userEvent.click(button);

        const actions = storewithFourPlayers.getActions();
        expect(actions[0].type).toEqual("game/createteams/pending");
    });
});
