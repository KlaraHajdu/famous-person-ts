type GameState = {
    gameId: string,
    ownName: string,
    gameMaster: string | null,
    ownTeam: string | null,
    players: string[] | null,
    round: number,
    teamOnTurn: string,
    greenPlayerIndex: number,
    bluePlayerIndex: number,
    turnOngoing: string,
    blueTeamScore: number,
    greenTeamScore: number,
    greenTeam:  string[] | null,
    blueTeam: string[] | null,
    names: {
        blueTeam: string[],
        greenTeam: string[],
    },
}

export default GameState