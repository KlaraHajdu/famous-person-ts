import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { databaseApi } from "../../../services/FirebaseRD/fbDatabase";
import GamePhase from "../../../types/GamePhase";
import RootState from "../../RootState";

const initialState = {
    gamePhase: GamePhase[sessionStorage.getItem("gamePhase")! as keyof typeof GamePhase] || null,
    modalOpened: false
}

const gamePhaseSlice = createSlice({
    name: 'gamePhase',
    initialState: initialState,
    reducers: {
        'NEXT_GAMEPHASE_ENTERED': (state, action: PayloadAction<GamePhase>) => {
            state.gamePhase = action.payload
            
        },
        'HOWTOPLAYMODAL_TOGGLED': (state, action: PayloadAction<boolean>) => {
            state.modalOpened = action.payload
            
        }
    }
})

export const verifyGamePhase = createAsyncThunk<boolean | string, string, { state: RootState }>(
    'gamephase/verifygamephase', async (payload, thunkApi) => {
        try {
            const response = await databaseApi.verifyGamePhase(payload)
            return response
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export const subscribeToGamePhase = createAsyncThunk<string, string, { state: RootState }>(
    'gamephase/subscribetogamephase', async (payload, thunkApi) => {
        try {
            await databaseApi.subscribeToGamePhase(payload,
                (snapshot) => thunkApi.dispatch(gamePhaseActions.NEXT_GAMEPHASE_ENTERED(snapshot)))
            return 'subscribed_to_gamephase'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export const unsubscribeFromGamePhase = createAsyncThunk<string, string, { state: RootState }>(
    'gamephase/unsubscribefromgamephase', async (payload, thunkApi) => {
        try {
            await databaseApi.unsubscribeFromGamePhase(payload)
            return 'unsubscribed_from_gamephase'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)

export const changeGamePhase = createAsyncThunk<string, GamePhase, { state: RootState }>(
    'gamephase/changegamephase', async (payload, thunkApi) => {
        const state = thunkApi.getState()
        const { gameId } = state.game
        try {
            await databaseApi.changeGamePhase(gameId!, payload)
            return 'gamephase_updated_in_db'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)
    
export default gamePhaseSlice.reducer

export const gamePhaseActions = gamePhaseSlice.actions

export const asyncGamePhaseActions = {
    verifyGamePhase,
    subscribeToGamePhase,
    unsubscribeFromGamePhase,
    changeGamePhase
}