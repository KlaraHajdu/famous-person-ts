import { getRandomNumberFromTo, formTeams }  from "./randomUtil";

describe("Randomutil's getRandomNumberFromTo", () => {
    it("returns a random integer between the two inputs", () => {
        const input1 = 3;
        const input2 = 5;
        const result = getRandomNumberFromTo(input1, input2)
    
        expect(result).toBeGreaterThanOrEqual(input1)
        expect(result).toBeLessThan(input2)
        expect(result%1).toEqual(0)
    })
})

describe("Randomutil's formTeams", () => {
    it("returns the two teams", () => {
        const players = ["fake_player", "fake_gameMaster", "fake_player2", "fake_player3"]
        const teams = formTeams(players)

        expect(teams.blueTeam.length + teams.greenTeam.length).toEqual(players.length)
        expect(teams.blueTeam.includes(teams.greenTeam[0])).toBeFalsy()
        expect(teams.blueTeam.includes(teams.greenTeam[1])).toBeFalsy()
        expect(teams.greenTeam.includes(teams.blueTeam[0])).toBeFalsy()
        expect(teams.greenTeam.includes(teams.blueTeam[1])).toBeFalsy()
    })
})