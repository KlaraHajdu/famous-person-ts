import React from "react";
import { render, screen } from "@testing-library/react";
import PlayersTable from "./PlayersTable";

describe("PlayersTable component", () => {
    it("renders without crashing", () => {
        render(<PlayersTable title="Players" players={["player1", "player2"]} />);
    });
    it("shows the title", async () => {
        render(<PlayersTable title="Players" players={["player1", "player2"]} />);

        const title = await screen.findByText("Players");
        expect(title).not.toBeNull();
    });
    it("shows all players", async () => {
        render(<PlayersTable title="Players" players={["player1", "player2"]} />);

        const player1 = await screen.findByText(/player1/i);
        expect(player1).not.toBeNull();
        const player2 = await screen.findByText(/player1/i);
        expect(player2).not.toBeNull();
    });
});
