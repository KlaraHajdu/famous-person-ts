import RootState from "../../RootState"

export const selectGamePhase = (state: RootState) => state.gamePhase.gamePhase
export const selectModalOpened = (state: RootState) => state.gamePhase.modalOpened