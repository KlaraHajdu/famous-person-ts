type GameState = {
    gameId: string,
    ownName: string,
    gameMaster: string | null,
    ownTeam: string | null,
    players: string[] | null,
    round: number | 1,
    teamOnTurn: string,
    greenPlayerIndex: string,
    bluePlayerIndex: string,
    turnOngoing: string,
    blueTeamScore: string,
    greenTeamScore: string,
    greenTeam:  string[] | null,
    blueTeam:  string[] | null,
}

export default GameState