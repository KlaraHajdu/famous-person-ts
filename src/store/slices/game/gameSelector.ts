import RootState from "../../RootState"

export const selectGameId = (state: RootState) => state.game.gameId
export const selectOwnName = (state: RootState) => state.game.ownName
export const selectGameMaster = (state: RootState) => state.game.gameMaster
export const selectOwnTeam = (state: RootState) => state.game.ownTeam
export const selectPlayers = (state: RootState) => state.game.players
export const selectRound = (state: RootState) => state.game.round
export const selectTeamOnTurn = (state: RootState) => state.game.teamOnTurn
export const selectGreenPlayerIndex = (state: RootState) => state.game.greenPlayerIndex
export const selectBluePlayerIndex = (state: RootState) => state.game.bluePlayerIndex
export const selectTurnOngoing = (state: RootState) => state.game.turnOngoing
export const selectBlueTeamScore = (state: RootState) => state.game.blueTeamScore
export const selectGreenTeamScore = (state: RootState) => state.game.greenTeamScore
export const selectGreenTeam = (state: RootState) => state.game.greenTeam
export const selectBlueTeam = (state: RootState) => state.game.blueTeam
export const selectGreenTeamNames = (state: RootState) => state.game.names.greenTeam
export const selectBlueTeamNames = (state: RootState) => state.game.names.blueTeam
export const selectAllNames = (state: RootState) => {
    if (state.game.names.greenTeam && state.game.names.blueTeam) {
       return state.game.names.blueTeam.concat(state.game.names.greenTeam)
    }
    return []
}
export const selectAllWordsInRound = (state: RootState) => {
    switch (state.game.round) {
        case 1:
            return state.game.round1Names
        case 2:
            return state.game.round2Names
        case 3:
            return state.game.round3Names
    }
}