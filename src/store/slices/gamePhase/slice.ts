import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import GamePhase from "../../../types/GamePhase";

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
    
export default gamePhaseSlice.reducer

export const gamePhaseActions = gamePhaseSlice.actions