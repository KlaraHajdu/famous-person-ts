import React from "react";
import { render } from "@testing-library/react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import PhaseHeader from "./PhaseHeader";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    game: {
        gameId: 1111,
        ownName: "fake_player",
        gameMaster: "fake_gameMaster",
    },
});

describe("NameInputForm component", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <PhaseHeader title="Fake title" subtitle="fake subtitle" />
            </Provider>
        );
    });
    it("shows the name, game master name and gameId", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <PhaseHeader title="Fake title" subtitle="fake subtitle" />
            </Provider>
        );

        const ownName = getByTestId("own-name");
        const gameMaster = getByTestId("game-master");
        const gameId = getByTestId("gameId");
        expect(ownName.textContent).toContain("fake_player");
        expect(gameMaster.textContent).toContain("Game master: fake_gameMaster");
        expect(gameId.textContent).toContain(1111);
    });
    it("shows the title and subtitle", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <PhaseHeader title="Fake title" subtitle="Fake subtitle" />
            </Provider>
        );

        const title = getByTestId("title");
        const subtitle = getByTestId("subtitle");
        expect(title.textContent).toContain("Fake title");
        expect(subtitle.textContent).toContain("Fake subtitle");
    });
});
