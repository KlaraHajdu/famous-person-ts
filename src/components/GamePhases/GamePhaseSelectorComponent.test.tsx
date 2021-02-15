import React from "react";
import { useSelector } from "react-redux";
import { render } from "@testing-library/react";
import GamePhasesSelectorComponent from "./GamePhasesSelectorComponent";
import GamePhase from "../../types/GamePhase";

jest.mock("react-redux");
const useSelectorMock = useSelector as jest.Mock;


describe("GamePhasesSelectorComponent", () => {
    it("renders without crashing", () => {
        useSelectorMock.mockImplementation(() => GamePhase.START_GAME);
        render(<GamePhasesSelectorComponent />);
    });
});
