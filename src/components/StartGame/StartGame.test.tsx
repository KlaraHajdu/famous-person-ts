import React from "react";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StartGame from "./StartGame";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();
jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector,
}));

jest.mock("../../services/FirebaseRD/fbDatabase.ts");

const mockCheckIfGameExists = jest.fn();
const mockCreateNewGame = jest.fn();
jest.mock("../../store/slices/game/slice", () => ({
    asyncGameActions: {
        checkIfGameExists: () => mockCheckIfGameExists,
        createNewGame: () => mockCreateNewGame,
    },
}));

describe("StartGame component", () => {
    it("renders without crashing", () => {
        render(<StartGame />);
    });
    it("shows helper text when name is too long", async () => {
        const { getByTestId } = render(<StartGame />);

        const nameInput = getByTestId("start-name-input");
        await userEvent.type(nameInput, "Naaaammmeeeeeeeeeeeeeeeeeee");

        const helperTextField = getByTestId("helper-text");
        expect(helperTextField.textContent).toEqual("Name too long!");
    });
    it("shows helper text when name is empty", async () => {
        const { getByTestId } = render(<StartGame />);

        const nameInput = getByTestId("start-name-input");
        await userEvent.type(nameInput, "Na");
        await userEvent.clear(nameInput);

        const helperTextField = getByTestId("helper-text");
        expect(helperTextField.textContent).toEqual("Name cannot be empty!");
    });
    it("dispatches an action to check gameId when name given", async () => {
        mockDispatch.mockResolvedValueOnce({ payload: "database down" });
        const { getByTestId } = render(<StartGame />);

        await act(async () => {
            const nameInput = getByTestId("start-name-input");
            await userEvent.type(nameInput, "master");
            const startButton = getByTestId("submit-button");
            await userEvent.click(startButton);
        });

        expect(mockDispatch).toBeCalledTimes(1);
        expect(mockDispatch).toBeCalledWith(mockCheckIfGameExists);
    });
    it("dispatches action to create game with a generated gameId", async () => {
        mockDispatch.mockResolvedValueOnce({ payload: false });
        mockCheckIfGameExists.mockImplementation((gameId) => gameId);
        const { getByTestId } = render(<StartGame />);

        await act(async () => {
            const nameInput = getByTestId("start-name-input");
            await userEvent.type(nameInput, "master");
            const startButton = getByTestId("submit-button");
            await userEvent.click(startButton);
        });
        expect(mockDispatch).toBeCalledTimes(2);
        expect(mockDispatch).toBeCalledWith(mockCheckIfGameExists);
        expect(mockDispatch).toBeCalledWith(mockCreateNewGame);
    });
});
