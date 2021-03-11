import React from "react";
import { render } from "@testing-library/react";
import PlayGameMaster from "./PlayGameMaster";

describe("PlayGameMaster component", () => {
    it("renders without crashing", () => {
        render(<PlayGameMaster playerOnTurn="fake-player"/>);
    });
});
