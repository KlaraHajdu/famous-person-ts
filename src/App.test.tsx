import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import App from "./App";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    game: {
        gameId: 1111,
    },
    gamePhase: {
        gamePhase: null,
        modalOpened: false,
    },
});

describe("App component", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });
});
