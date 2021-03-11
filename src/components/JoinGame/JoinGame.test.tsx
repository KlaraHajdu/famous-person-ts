import React from "react";
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JoinGame from "./JoinGame";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
}));

jest.mock("../../services/FirebaseRD/fbDatabase.ts");

describe("JoinGame component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders without crashing", () => {
        render(<JoinGame />);
    });
    it("shows helper text when name is too long", async () => {
        const { getByTestId } = render(<JoinGame />);

        const nameInput = getByTestId("name-input");
        await userEvent.type(nameInput, "Naaaammmeeeeeeeeeeeeeeeeeee");

        const helperTextField = getByTestId("helper-text-name");
        expect(helperTextField.textContent).toEqual("Name too long!");
    });
    it("shows helper text when name is empty", async () => {
        const { getByTestId } = render(<JoinGame />);

        const nameInput = getByTestId("name-input");
        await userEvent.type(nameInput, "Na");
        await userEvent.clear(nameInput);

        const helperTextField = getByTestId("helper-text-name");
        expect(helperTextField.textContent).toEqual("Name cannot be empty!");
    });
    it("shows helper text when gameId is empty", async () => {
        const { getByTestId } = render(<JoinGame />);

        const gameIdInput = getByTestId("gameid-input");
        await userEvent.type(gameIdInput, "543");
        await userEvent.clear(gameIdInput);

        const helperTextField = getByTestId("helper-text-gameid");
        expect(helperTextField.textContent).toEqual("Game ID cannot be empty!");
    });
    it("dispatches an action to check gameId when name and gameId given", async () => {
        mockDispatch.mockResolvedValueOnce({ payload: false });
        const { getByTestId } = render(<JoinGame />);
        await act(async () => {
            const nameInput = getByTestId("name-input");
            await userEvent.type(nameInput, "User");
            const gameIdInput = getByTestId("gameid-input");
            await userEvent.type(gameIdInput, "5453");
            const startButton = getByTestId("submit-button");
            await userEvent.click(startButton);
        });

        expect(mockDispatch).toBeCalledTimes(1);
    });
    it("shows helper text when wrong gameId given", async () => {
        mockDispatch.mockResolvedValueOnce({ payload: false });
        const { getByTestId } = render(<JoinGame />);

        await act(async () => {
            const nameInput = getByTestId("name-input");
            await userEvent.type(nameInput, "User");
            const gameIdInput = getByTestId("gameid-input");
            await userEvent.type(gameIdInput, "5453");
            const startButton = getByTestId("submit-button");
            await userEvent.click(startButton);
        });

        const helperTextField = getByTestId("helper-text-gameid");
        expect(helperTextField.textContent).toEqual("Wrong game ID!");
    });
    it("dispatches an action to verify game phase when name and gameId given", async () => {
        mockDispatch.mockResolvedValueOnce({ payload: true });
        mockDispatch.mockResolvedValueOnce({ payload: false });
        const { getByTestId } = render(<JoinGame />);
        await act(async () => {
            const nameInput = getByTestId("name-input");
            await userEvent.type(nameInput, "User");
            const gameIdInput = getByTestId("gameid-input");
            await userEvent.type(gameIdInput, "5453");
            const startButton = getByTestId("submit-button");
            await userEvent.click(startButton);
        });

        expect(mockDispatch).toBeCalledTimes(2);
    });
    it("shows helper text when game has already started", async () => {
        mockDispatch.mockResolvedValueOnce({ payload: true });
        mockDispatch.mockResolvedValueOnce({ payload: false });
        const { getByTestId } = render(<JoinGame />);
        await act(async () => {
            const nameInput = getByTestId("name-input");
            await userEvent.type(nameInput, "User");
            const gameIdInput = getByTestId("gameid-input");
            await userEvent.type(gameIdInput, "5453");
            const startButton = getByTestId("submit-button");
            await userEvent.click(startButton);
        });

        const helperTextField = getByTestId("helper-text-gameid");
        expect(helperTextField.textContent).toEqual("You cannot join a game, which has already started!");;
    });
    it("dispatches action to check if player name is taken if game ID and gamePhase are correct", async () => {
        mockDispatch.mockResolvedValueOnce({ payload: true });
        mockDispatch.mockResolvedValueOnce({ payload: true });
        mockDispatch.mockResolvedValueOnce({ payload: true });
        const { getByTestId } = render(<JoinGame />);

        await act(async () => {
            const nameInput = getByTestId("name-input");
            await userEvent.type(nameInput, "User");
            const gameIdInput = getByTestId("gameid-input");
            await userEvent.type(gameIdInput, "5453");
            const startButton = getByTestId("submit-button");
            await userEvent.click(startButton);
        });

        expect(mockDispatch).toBeCalledTimes(3);
    });
    it("shows helper text when player name is already taken", async () => {
        mockDispatch.mockResolvedValueOnce({ payload: true });
        mockDispatch.mockResolvedValueOnce({ payload: true });
        mockDispatch.mockResolvedValueOnce({ payload: true });
        const { getByTestId } = render(<JoinGame />);

        await act(async () => {
            const nameInput = getByTestId("name-input");
            await userEvent.type(nameInput, "User");
            const gameIdInput = getByTestId("gameid-input");
            await userEvent.type(gameIdInput, "5453");
            const startButton = getByTestId("submit-button");
            await userEvent.click(startButton);
        });

        const helperTextField = getByTestId("helper-text-name");
        expect(helperTextField.textContent).toEqual("This name is already taken, please choose another!");
    });
    it("dispatches action to join game when name, game ID and gamePhase are correct", async () => {
        mockDispatch.mockResolvedValueOnce({ payload: true });
        mockDispatch.mockResolvedValueOnce({ payload: true });
        mockDispatch.mockResolvedValueOnce({ payload: false });
        const { getByTestId } = render(<JoinGame />);

        await act(async () => {
            const nameInput = getByTestId("name-input");
            await userEvent.type(nameInput, "User");
            const gameIdInput = getByTestId("gameid-input");
            await userEvent.type(gameIdInput, "5453");
            const startButton = getByTestId("submit-button");
            await userEvent.click(startButton);
        });

        expect(mockDispatch).toBeCalledTimes(4);
    });
});
