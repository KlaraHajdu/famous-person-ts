import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { databaseApi } from "../../../services/FirebaseRD/fbDatabase";
import GamePhase from "../../../types/GamePhase";
import RootState from "../../RootState";
import { gameActions } from "../game/slice";

const initialState = {
    gamePhase: GamePhase[sessionStorage.getItem("gamePhase")! as keyof typeof GamePhase] || null,
    modalOpened: false
}

const gamePhaseSlice = createSlice({
    name: 'gamePhase',
    initialState: initialState,
    reducers: {
        'NEXT_GAMEPHASE_ENTERED': (state, action: PayloadAction<any>) => {
            state.gamePhase = action.payload
            
        },
        'HOWTOPLAYMODAL_TOGGLED': (state, action: PayloadAction<any>) => {
            state.modalOpened = action.payload
            
        }
    }
})

export const subscribeToGamePhase = createAsyncThunk<string, number, { state: RootState }>(
    'gamephase/subscribetogamephase', async (payload, thunkApi) => {
        try {
            await databaseApi.subscribeToGamePhase(payload,
                (snapshot) => thunkApi.dispatch(gamePhaseActions.NEXT_GAMEPHASE_ENTERED(snapshot)))
            return 'gamephase_updated'
        }
        catch {
            return thunkApi.rejectWithValue('database_down')
        }
    }
)
    
export default gamePhaseSlice.reducer

export const gamePhaseActions = gamePhaseSlice.actions

export const asyncGamePhaseActions = {
    subscribeToGamePhase
}