import React from "react";
import { render } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import AddNames from "./AddNames";

jest.mock("react-redux");
const mockedUseSelector = useSelector as jest.Mock;
const mockedDispatch = useDispatch as jest.Mock;
const fakeDispatch = jest.fn();

jest.mock("../../services/FirebaseRD/fbDatabase.ts");

jest.mock("../../constants", () => ({
    CONSTANTS: {
        NUMBER_OF_NAMES_TO_START_GAME: 4,
        ROUND_LENGTH: 3,
    },
}));

jest.mock("../NameInputForm/NameInputForm", () => {
    return function Dummy() {
        return <div></div>;
    };
});
jest.mock("../PhaseHeader/PhaseHeader", () => {
    return function Dummy() {
        return <div></div>;
    };
});
jest.mock("../TeamContainer/TeamContainer", () => {
    return function Dummy() {
        return <div></div>;
    };
});

describe("AddNames component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("renders without crashing", () => {
        mockedUseSelector.mockImplementationOnce(() => ["fake_name", "fake_name2", "fake_name3"]);
        mockedUseSelector.mockImplementationOnce(() => "fake_GameMaster");
        mockedUseSelector.mockImplementationOnce(() => "fake_GameMaster");
        render(<AddNames />);
    });
    it("dispatches gamephase change action if user is game master and all names are added", async () => {
        mockedUseSelector.mockImplementationOnce(() => ["fake_name", "fake_name2", "fake_name3", "fake_name4"]);
        mockedUseSelector.mockImplementationOnce(() => "fake_GameMaster");
        mockedUseSelector.mockImplementationOnce(() => "fake_GameMaster");
        mockedDispatch.mockImplementationOnce(() => fakeDispatch);
        render(<AddNames />);

        expect(fakeDispatch).toHaveBeenCalled();
    });
    it("does not dispatch gamephase change action if user is not game master and all names are added", async () => {
        mockedUseSelector.mockImplementationOnce(() => ["fake_name", "fake_name2", "fake_name3", "fake_name4"]);
        mockedUseSelector.mockImplementationOnce(() => "fake_user2");
        mockedUseSelector.mockImplementationOnce(() => "fake_user");
        mockedDispatch.mockImplementation(() => fakeDispatch);
        render(<AddNames />);

        expect(fakeDispatch).not.toHaveBeenCalled();
    });
});
