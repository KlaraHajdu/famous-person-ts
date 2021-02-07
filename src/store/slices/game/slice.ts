import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { databaseApi } from "../../../services/FirebaseRD/fbDatabase";
import GamePhase from "../../../types/GamePhase";
import RootState from "../../RootState";
import { gamePhaseActions } from "../gamePhase/slice";

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
    blueTeam:  sessionStorage.getItem("blueTeam")?.split(",")  || null,

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
            players?: string[], greenTeam?: string[], blueTeam?: string[]
        }>) => {

            for (let key of Object.keys(action.payload)) {
                switch (key) {
                    case "gameMaster":
                        if (action.payload["gameMaster"]) { 
                            state.gameMaster = action.payload["gameMaster"]
                        }
                        break
                    case "ownTeam":
                            if (action.payload["ownTeam"]) {
                                state.ownTeam = action.payload["ownTeam"]
                            }
                        break
                    case "round":
                        if (action.payload["round"]) {
                            state.round = action.payload["round"]
                        }
                        break

                    case "teamOnTurn":
                            if (action.payload["teamOnTurn"]) {
                                state.teamOnTurn = action.payload["teamOnTurn"]
                            }
                        break
                    case "greenPlayerIndex":
                            if (action.payload["greenPlayerIndex"]) {
                                state.greenPlayerIndex = action.payload["greenPlayerIndex"]
                            }
                        break
                    case "bluePlayerIndex":
                            if (action.payload["bluePlayerIndex"]) {
                                state.bluePlayerIndex = action.payload["bluePlayerIndex"]
                            }
                        break
                    case "turnOngoing":
                            if (action.payload["turnOngoing"]) {
                                state.turnOngoing = action.payload["turnOngoing"]
                            }
                        break
                    case "players":
                            if (action.payload["players"]) {
                                state.players = Object.keys(action.payload["players"])
                            }
                        break
                    case "greenTeam":
                            if (action.payload["greenTeam"]) {
                                state.greenTeam = action.payload["greenTeam"]
                            }
                        break
                    case "blueTeam":
                            if (action.payload["blueTeam"]) {
                                state.greenTeam = action.payload["blueTeam"]
                            }
                        break
                }
                }
        },
        'GAME_JOINED': (state, action: PayloadAction<any>) => {
            state.gameId = action.payload.gameId
            state.ownName = action.payload.ownName
        },
        'OWN_TEAM_JOINED': (state, action: PayloadAction<any>) => {
            state.ownTeam = action.payload.ownTeam
        },
        'PLAYERS_UPDATED': (state, action: PayloadAction<any>) => {
            state.players = action.payload.players
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
        },
         "GREEN_TEAM_SET": (state, action: PayloadAction<any>) => {
                state.greenTeam = action.payload.greenTeam
        },
         "BLUE_TEAM_SET":  (state, action: PayloadAction<any>) => {
                state.blueTeam = action.payload.blueTeam
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

export const checkIfPlayerNameExists = createAsyncThunk<string | boolean, { gameId: number, ownName: string }, {state: RootState}>(
    'game/checkifplayernameexists', async (payload, thunkApi) => {
        try {
            const response = await databaseApi.checkIfPlayerNameExists(payload.gameId, payload.ownName )
            return !!response 
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
})


export const createNewGame = createAsyncThunk<string, {gameId: number, gameMaster: string}, { state: RootState }>(
    'game/createnewgame', async (payload, thunkApi) => {
        try {
            const { gameId, gameMaster } = payload
            const newGame = { gameId, gameMaster, ownName: gameMaster }
            await databaseApi.createNewGame(newGame)
            thunkApi.dispatch(gameActions.GAME_CREATED(newGame))
            // thunkApi.dispatch(gamePhaseActions.NEXT_GAMEPHASE_ENTERED(GamePhase.WAITING_ROOM));
            sessionStorage.setItem("gameMaster", payload.gameMaster); // itt???
            sessionStorage.setItem("ownName", payload.gameMaster);
            return 'new_game_created'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
})

export const joinGame = createAsyncThunk<string, {gameId: number, ownName: string}, { state: RootState }>(
    'game/joingame', async (payload, thunkApi) => {
        try {
            await databaseApi.joinGame(payload)
            thunkApi.dispatch(gameActions.GAME_JOINED(payload))
            return 'game_joined'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
})
    
export const subscribeToGame = createAsyncThunk<string, number, { state: RootState }>(
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

export default gameSlice.reducer

export const gameActions = gameSlice.actions

export const asyncGameActions = {
    checkIfGameExists,
    checkIfPlayerNameExists,
    createNewGame,
    joinGame,
    subscribeToGame
}