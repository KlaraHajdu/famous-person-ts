import GameState from './slices/game/GameState'
import GamePhaseState from './slices/gamePhase/GamePhaseState'
 
type RootState = {
    game: GameState
    gamePhase: GamePhaseState
}

export default RootState