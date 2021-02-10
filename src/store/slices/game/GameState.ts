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
    turnOngoing: boolean,
    blueTeamScore: number,
    greenTeamScore: number,
    greenTeam:  string[] | null,
    blueTeam: string[] | null,
    names: {
        blueTeam: string[],
        greenTeam: string[],
    },
    round1Names: string[] | null,
    round2Names: string[] | null,
    round3Names: string[] | null,
}

export default GameState