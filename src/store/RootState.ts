import GameState from './slices/game/GameState'
import GamePhaseState from './slices/gamePhase/GamePhaseState'
// import NotificationState from './slices/notification/NotificationState'
 
type RootState = {
    game: GameState
    gamePhase: GamePhaseState
//  notification: NotificationState
}

export default RootState