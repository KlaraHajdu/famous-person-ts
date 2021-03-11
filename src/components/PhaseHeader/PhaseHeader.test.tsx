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
        expect(ownName.textContent).toContain("fake_player");
        const gameMaster = getByTestId("game-master");
        expect(gameMaster.textContent).toContain("Game master: fake_gameMaster");
        const gameId = getByTestId("gameId");
        expect(gameId.textContent).toContain(1111);
    });
    it("shows the title and subtitle", () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <PhaseHeader title="Fake title" subtitle="Fake subtitle" />
            </Provider>
        );

        const title = getByTestId("title");
        expect(title.textContent).toContain("Fake title");
        const subtitle = getByTestId("subtitle");
        expect(subtitle.textContent).toContain("Fake subtitle");
    });
});
