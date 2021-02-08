import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    turnOngoing: sessionStorage.getItem("turnOngoing") || "0",
    blueTeamScore: Number(sessionStorage.getItem("blueTeamScore")) || 0,
    greenTeamScore: Number(sessionStorage.getItem("greenTeamScore")) || 0,
    greenTeam:  sessionStorage.getItem("greenTeam")?.split(",")  || null,
    blueTeam: sessionStorage.getItem("blueTeam")?.split(",") || null,
    names: {
        greenTeam: sessionStorage.getItem("greenTeamNames")?.split(",") || [],
        blueTeam: sessionStorage.getItem("blueTeamNames")?.split(",") || [],
    }  

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
            gameMaster?: string, round?: number, ownTeam?: string, teamOnTurn?: string
            greenPlayerIndex?: number, bluePlayerIndex?: number, turnOngoing?: string,
            players?: string[], teams?: { greenTeam: string[], blueTeam: string[] },
            names?: { greenTeam: string, blueTeam:string }
        }>) => {

            for (let key of Object.keys(action.payload)) {
                switch (key) {
                    case "gameMaster":
                        if (action.payload.gameMaster) { 
                            state.gameMaster = action.payload.gameMaster
                        }
                        break
                    case "ownTeam":
                            if (action.payload.ownTeam) {
                                state.ownTeam = action.payload.ownTeam
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
                }
                }
        },
        'GAME_JOINED': (state, action: PayloadAction<any>) => {
            state.gameId = action.payload.gameId
            state.ownName = action.payload.ownName
        },
        'ROUND_ENDED': (state, action: PayloadAction<any>) => {
            state.round = action.payload.nextRound
        },
        'BLUEPLAYER_FINISHED': (state, action: PayloadAction<any>) => {
            state.bluePlayerIndex = action.payload.nextBluePlayerIndex
        },
        
        'GREENPLAYER_FINISHED': (state, action: PayloadAction<any>) => {
            state.greenPlayerIndex = action.payload.nextGreenPlayerIndex
        },
        
        'TEAM_FINISHED': (state, action: PayloadAction<any>) => {
            state.teamOnTurn = action.payload.nextTeam
        },
        
        'TURN_ONGOING': (state, action: PayloadAction<any>) => {
            state.turnOngoing = action.payload.finished
        },
         
        'GREEN_TEAM_SCORED': (state, action: PayloadAction<any>) => {
            state.greenTeamScore = action.payload.greenTeamScore

        },
        'BLUE_TEAM_SCORED': (state, action: PayloadAction<any>) => {
            state.blueTeamScore = action.payload.blueTeamScore
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
        if (!ownTeam) {
            return thunkApi.rejectWithValue('no_own_team')
        }
        try {
            await databaseApi.addName(gameId, payload, ownTeam)
            return 'name_added_in_database'
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
    addName
}