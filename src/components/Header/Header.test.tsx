import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import Header from "./Header";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    game: {
        gameId: null,
    },
    gamePhase: {
        modalOpened: false,
    },
});

const storewithGameId = mockStore({
    game: {
        gameId: 1234,
    },
    gamePhase: {
        modalOpened: false,
    },
});

describe("Header component", () => {
    beforeEach(() => {
        store.clearActions();
        storewithGameId.clearActions();
    });
    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <Header />
            </Provider>
        );
    });
    it("dispatches the right action when user clicks to start game", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        const showMenuDiv = getByTestId("show-menu-div");
        const showMenuButton = showMenuDiv.firstChild as HTMLElement;
        await userEvent.click(showMenuButton);
        const startGameButton = getByTestId("start-game");
        await userEvent.click(startGameButton);

        const actions = store.getActions();
        expect(actions[0].type).toEqual("gamePhase/NEXT_GAMEPHASE_ENTERED");
        expect(actions[0].payload).toEqual("startGame");
    });
    it("dispatches the right action when user clicks to join game", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        const showMenuDiv = getByTestId("show-menu-div");
        const showMenuButton = showMenuDiv.firstChild as HTMLElement;
        await userEvent.click(showMenuButton);
        const jointGameButton = getByTestId("join-game");
        await userEvent.click(jointGameButton);

        const actions = store.getActions();
        expect(actions[0].type).toEqual("gamePhase/NEXT_GAMEPHASE_ENTERED");
        expect(actions[0].payload).toEqual("joinGame");
    });
    it("dispatches the right actions when there is a gameId", async () => {
        render(
            <Provider store={storewithGameId}>
                <Header />
            </Provider>
        );

        const actions = storewithGameId.getActions();
        expect(actions[0].type).toEqual("game/subscribetogame/pending");
        expect(actions[1].type).toEqual("gamephase/subscribetogamephase/pending");
    });
    it("dispatches the right actions when user clicks the how to play modal", async () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Header />
            </Provider>
        );

        const modalToggleButton = getByTestId("open-modal");
        await userEvent.click(modalToggleButton);

        const actions = store.getActions();
        expect(actions[0].type).toEqual("gamePhase/HOWTOPLAYMODAL_TOGGLED");
        expect(actions[0].payload).toEqual(true);
    });
});
