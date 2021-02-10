import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { databaseApi } from "../../../services/FirebaseRD/fbDatabase";
import GamePhase from "../../../types/GamePhase";
import { formTeams } from "../../../utils/randomUtil";
import RootState from "../../RootState";
import { asyncGamePhaseActions } from "../gamePhase/slice";

const initialState = {
    gameId: sessionStorage.getItem("gameId") || null,
    ownName: sessionStorage.getItem("ownName") || null,
    gameMaster: sessionStorage.getItem("gameMaster") || null,
    ownTeam: sessionStorage.getItem("ownTeam") || null,
    players: sessionStorage.getItem("players")?.split(",") || null,
    round: Number(sessionStorage.getItem("round")) || 1,
    teamOnTurn: sessionStorage.getItem("teamOnTurn") || "greenTeam",
    greenPlayerIndex: Number(sessionStorage.getItem("greenTeamPlayerIndex")) || 0,
    bluePlayerIndex: Number(sessionStorage.getItem("blueTeamPlayerIndex")) || 0,
    turnOngoing: !!sessionStorage.getItem("turnOngoing") || false,
    blueTeamScore: Number(sessionStorage.getItem("blueTeamScore")) || 0,
    greenTeamScore: Number(sessionStorage.getItem("greenTeamScore")) || 0,
    greenTeam:  sessionStorage.getItem("greenTeam")?.split(",")  || null,
    blueTeam: sessionStorage.getItem("blueTeam")?.split(",") || null,
    names: {
        greenTeam: sessionStorage.getItem("greenTeamNames")?.split(",") || [],
        blueTeam: sessionStorage.getItem("blueTeamNames")?.split(",") || [],
    },
    round1Names: sessionStorage.getItem("round1")?.split(",") || [],
    round2Names: sessionStorage.getItem("round2")?.split(",") || [],
    round3Names: sessionStorage.getItem("round3")?.split(",") || [],

}

const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        'GAME_CREATED': (state, action: PayloadAction<any>) => {
            state.gameId = action.payload.gameId
            state.ownName = action.payload.ownName
            state.gameMaster = action.payload.gameMaster
            
        },
        'GAME_UPDATED': (state, action: PayloadAction<{
            gameMaster?: string, round?: number, teamOnTurn?: string
            greenPlayerIndex?: number, bluePlayerIndex?: number, blueTeamScore?: number,
            greenTeamScore?: number, turnOngoing?: boolean,
            players?: string[], teams?: { greenTeam: string[], blueTeam: string[] },
            names?: { greenTeam: string, blueTeam: string },
            round1?: string[], round2?: string[], round3?: string[],
        }>) => {

            for (let key of Object.keys(action.payload)) {
                switch (key) {
                    case "gameMaster":
                        if (action.payload.gameMaster) { 
                            state.gameMaster = action.payload.gameMaster
                        }
                        break
                    case "round":
                        if (action.payload.round) {
                            state.round = action.payload.round
                        }
                        break

                    case "teamOnTurn":
                            if (action.payload.teamOnTurn) {
                                state.teamOnTurn = action.payload.teamOnTurn
                            }
                        break
                    case "greenPlayerIndex":
                            if (action.payload.greenPlayerIndex) {
                                state.greenPlayerIndex = action.payload.greenPlayerIndex
                            }
                        break
                    case "bluePlayerIndex":
                            if (action.payload.bluePlayerIndex) {
                                state.bluePlayerIndex = action.payload.bluePlayerIndex
                            }
                        break
                    case "greenTeamScore":
                            if (action.payload.greenTeamScore) {
                                state.greenTeamScore = action.payload.greenTeamScore
                            }
                        break
                    case "blueTeamScore":
                            if (action.payload.blueTeamScore) {
                                state.blueTeamScore = action.payload.blueTeamScore
                            }
                        break
                    case "turnOngoing":
                            if (action.payload.turnOngoing) {
                                state.turnOngoing = action.payload.turnOngoing
                            }
                        break
                    case "players":
                            if (action.payload.players) {
                                state.players = Object.keys(action.payload.players)
                            }
                        break
                    case "teams":
                            if (action.payload.teams) {
                                state.greenTeam = Object.values(action.payload.teams.greenTeam)
                                state.blueTeam = Object.values(action.payload.teams.blueTeam)
                                if (state.ownName && state.greenTeam.includes(state.ownName)) {
                                    state.ownTeam = "greenTeam"
                                }
                                else {
                                    state.ownTeam = "blueTeam"
                                }
                                
                            }
                        break
                    case "names":
                        if (action.payload.names && action.payload.names.greenTeam) {
                            Object.keys(action.payload.names.greenTeam).forEach((n) => {
                                if (!state.names.greenTeam.includes(n)) {
                                    state.names.greenTeam.push(n)
                                }
                            })
                        }
                        if (action.payload.names && action.payload.names.blueTeam) {
                            Object.keys(action.payload.names.blueTeam).forEach((n) => {
                                if (!state.names.blueTeam.includes(n)) {
                                    state.names.blueTeam.push(n)
                                }
                            })
                        }    
                        break
                    case "round1":
                        state.round1Names = Object.entries(action.payload.round1!).filter(([key, value]) => value).map((arr) => arr[0])
                        break
                    case "round2":
                        state.round2Names = Object.entries(action.payload.round2!).filter(([key, value]) => value).map((arr) => arr[0])
                        break
                    case "round3":
                        state.round3Names = Object.entries(action.payload.round3!).filter(([key, value]) => value).map((arr) => arr[0])
                        break
                }
            }
        },
        'GAME_JOINED': (state, action: PayloadAction<any>) => {
            state.gameId = action.payload.gameId
            state.ownName = action.payload.ownName
        },
        'TEAMONTURN_UPDATED': (state, action: PayloadAction<any>) => {
            state.teamOnTurn = action.payload.teamOnTurn
        },
        'GREENPLAYERINDEX_UPDATED': (state, action: PayloadAction<any>) => {
            state.greenPlayerIndex = action.payload
        },
        'BLUEPLAYERINDEX_UPDATED': (state, action: PayloadAction<any>) => {
            state.bluePlayerIndex = action.payload
        }
    }
}
)

export const checkIfGameExists = createAsyncThunk<string | boolean, string, {state: RootState}>(
    'game/checkifgameidexists', async (payload, thunkApi) => {
        try {
            const response = await databaseApi.checkIfGameIdExists(payload)
            return !!response 
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
})

export const checkIfPlayerNameExists = createAsyncThunk<string | boolean, { gameId: string, ownName: string }, {state: RootState}>(
    'game/checkifplayernameexists', async (payload, thunkApi) => {
        try {
            const response = await databaseApi.checkIfPlayerNameExists(payload.gameId, payload.ownName )
            return !!response 
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
})


export const createNewGame = createAsyncThunk<string, {gameId: string, gameMaster: string}, { state: RootState }>(
    'game/createnewgame', async (payload, thunkApi) => {
        try {
            const { gameId, gameMaster } = payload
            const newGame = { gameId, gameMaster, ownName: gameMaster }
            await databaseApi.createNewGame(gameId, gameMaster)
            thunkApi.dispatch(gameActions.GAME_CREATED(newGame))
            sessionStorage.setItem("gameMaster", payload.gameMaster)
            sessionStorage.setItem("ownName", payload.gameMaster)
            return 'new_game_created'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
})

export const joinGame = createAsyncThunk<string, {gameId: string, ownName: string}, { state: RootState }>(
    'game/joingame', async (payload, thunkApi) => {
        const {gameId, ownName } = payload
        try {
            await databaseApi.joinGame(gameId, ownName)
            thunkApi.dispatch(gameActions.GAME_JOINED(payload))
            return 'game_joined'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
})
    
export const subscribeToGame = createAsyncThunk<string, string, { state: RootState }>(
    'game/subscribetogame', async (payload, thunkApi) => {
        try {
            await databaseApi.subscribeToGame(payload,
               (snapshot: any) => thunkApi.dispatch(gameActions.GAME_UPDATED(snapshot)))
            return 'game_updated'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export const createTeams = createAsyncThunk<string, string, { state: RootState }>(
    'game/createteams', async (payload, thunkApi) => {
        const state = thunkApi.getState()
        const { game } = state
        const { players, gameId } = game
        if (!players) {
            return 'no_players'
        }
        const teams = formTeams(players)
        const { greenTeam, blueTeam } = teams
        try {
            await databaseApi.setTeams(gameId, greenTeam, blueTeam)
            thunkApi.dispatch(asyncGamePhaseActions.changeGamePhase(GamePhase.ADD_NAMES))
            return 'teams_updated_in_database'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export const checkIfNameExists = createAsyncThunk<string, string, { state: RootState }>(
    'game/checkifnameexists', async (payload, thunkApi) => {
        const state = thunkApi.getState()
        const { game } = state
        const { gameId } = game 
        try {
            const nameExists = await databaseApi.checkIfNameExists(gameId, payload)
            if (!nameExists) {
                thunkApi.dispatch(asyncGameActions.addName(payload))
            }
            return 'name_checked_if_exists'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export const addName = createAsyncThunk<string, string, { state: RootState }>(
    'game/addname', async (payload, thunkApi) => {
        const state = thunkApi.getState()
        const { game } = state
        const { gameId, ownTeam } = game 
        try {
            await databaseApi.addName(gameId, payload, ownTeam!)
            return 'name_added_in_database'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export const startPlay = createAsyncThunk<string, string, { state: RootState }>(
    'game/startplay', async (payload, thunkApi) => {
        const state = thunkApi.getState()
        const { game } = state
        const { gameId } = game 

        const date = moment().format("LLLL").toString();
        try {
            await databaseApi.startPlay(gameId, date)
            return 'initial_playstate_uploaded_in_database'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export const updateTurnOngoing = createAsyncThunk<string, boolean, { state: RootState }>(
    'game/updateturnongoing', async (payload, thunkApi) => {
        const state = thunkApi.getState()
        const { game } = state
        const { gameId } = game 
        try {
            await databaseApi.updateTurnOngoing(gameId, payload)
            return 'turnOngoing_updated_in_database'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export const updateRound = createAsyncThunk<string, number, { state: RootState }>(
    'game/updateturnongoing', async (payload, thunkApi) => {
        const state = thunkApi.getState()
        const { game } = state
        const { gameId } = game 
        try {
            await databaseApi.updateRound(gameId, payload)
            return 'round_updated_in_database'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export const updateTeamOnTurn = createAsyncThunk<string, string, { state: RootState }>(
    'game/updateteamonturn', async (payload, thunkApi) => {
        const state = thunkApi.getState()
        const { game } = state
        const { gameId } = game 
        try {
            gameActions.TEAMONTURN_UPDATED(payload)
            await databaseApi.updateTeamOnTurn(gameId, payload)
            return 'teamOnTurn_updated_in_database'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export const updatePlayerIndex = createAsyncThunk<string, string, { state: RootState }>(
    'game/updateplayerindex', async (payload, thunkApi) => {
        const state = thunkApi.getState()
        const { game } = state
        const { gameId, greenPlayerIndex, bluePlayerIndex, greenTeam, blueTeam } = game 
        const teamOnTurn  = payload
        
        try {
            if (teamOnTurn === "greenTeam") {
                if (greenPlayerIndex === greenTeam!.length) {
                    gameActions.GREENPLAYERINDEX_UPDATED(0)
                    await databaseApi.updatePlayerIndex(gameId, "greenPlayerIndex", 0)
                    return 'playerIndex_updated_in_database'
                } else if (greenPlayerIndex === greenTeam!.length - 1) {
                    gameActions.GREENPLAYERINDEX_UPDATED(0)
                    await databaseApi.updatePlayerIndex(gameId, "greenPlayerIndex", 0)
                    return 'playerIndex_updated_in_database'
                } else {
                    gameActions.GREENPLAYERINDEX_UPDATED(greenPlayerIndex + 1)
                    await databaseApi.updatePlayerIndex(gameId, "greenPlayerIndex", greenPlayerIndex + 1)
                    return 'playerIndex_updated_in_database'
                }
            } else {
                if (bluePlayerIndex === blueTeam!.length) {
                    gameActions.BLUEPLAYERINDEX_UPDATED(0)
                    await databaseApi.updatePlayerIndex(gameId, "bluePlayerIndex", 0)
                    return 'playerIndex_updated_in_database'
                } else if (bluePlayerIndex === blueTeam!.length - 1) {
                    gameActions.BLUEPLAYERINDEX_UPDATED(0)
                    await databaseApi.updatePlayerIndex(gameId, "bluePlayerIndex", 0)
                    return 'playerIndex_updated_in_database'
                } else {
                    gameActions.BLUEPLAYERINDEX_UPDATED(bluePlayerIndex + 1)
                    await databaseApi.updatePlayerIndex(gameId, "bluePlayerIndex", bluePlayerIndex + 1)
                }
                return 'playerIndex_updated_in_database'
            }
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)


export const deleteWordFromRound = createAsyncThunk<string, string, { state: RootState }>(
    'game/deletewordfromround', async (payload, thunkApi) => {
        const state = thunkApi.getState()
        const { game } = state
        const { gameId, round } = game 

        try {
            await databaseApi.deleteWordFromRound(gameId, round, payload)
            return 'word_deleted_in_database'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export const updateScore = createAsyncThunk<string, string, { state: RootState }>(
    'game/updatescore', async (payload, thunkApi) => {
        const state = thunkApi.getState()
        const { game } = state
        const { gameId, greenTeamScore, blueTeamScore} = game 
        const ownTeam = payload
        const ownScore = ownTeam === "greenTeam"? greenTeamScore : blueTeamScore
        try {
            await databaseApi.updateScore(gameId, ownTeam, ownScore+1)
            return 'score_updated_in_database'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export default gameSlice.reducer

export const gameActions = gameSlice.actions

export const asyncGameActions = {
    checkIfGameExists,
    checkIfPlayerNameExists,
    checkIfNameExists,
    createNewGame,
    joinGame,
    subscribeToGame,
    createTeams,
    addName,
    startPlay,
    updateTurnOngoing,
    updateRound,
    updateTeamOnTurn,
    updatePlayerIndex,
    deleteWordFromRound,
    updateScore
}