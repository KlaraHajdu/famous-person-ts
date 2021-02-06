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
    round: sessionStorage.getItem("round") || 1,
    teamOnTurn: sessionStorage.getItem("teamOnTurn") || "greenTeam",
    greenPlayerIndex: sessionStorage.getItem("greenTeamPlayerIndex") || "0",
    bluePlayerIndex: sessionStorage.getItem("blueTeamPlayerIndex") || "0",
    turnOngoing: sessionStorage.getItem("turnOngoing") || "0",
    blueTeamScore: sessionStorage.getItem("blueTeamScore") || "0",
    greenTeamScore: sessionStorage.getItem("greenTeamScore") || "0",
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
        'GAME_JOINED': (state, action: PayloadAction<any>) => {
            state.ownName = action.payload.ownName
            state.gameId = action.payload.gameId
            state.gameMaster = action.payload.gameMaster
            
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
            const response = await databaseApi.readOnceId(`games/${payload}`)
            return !!response 
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
})


export const createNewGame = createAsyncThunk<string, {gameId: number, gameMaster: string}, { state: RootState }>(
    'game/createnewgame', async (payload, thunkApi) => {
        try {
            await databaseApi.createNewGame(payload)
            sessionStorage.setItem("gameMaster", payload.gameMaster);
            sessionStorage.setItem("ownName", payload.gameMaster);
            thunkApi.dispatch(gamePhaseActions.NEXT_GAMEPHASE_ENTERED(GamePhase.WAITING_ROOM));
            return 'new_game_created'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    })

export default gameSlice.reducer

export const gameActions = gameSlice.actions

export const asyncGameActions = {
    checkIfGameExists,
    createNewGame
}