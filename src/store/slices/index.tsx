import { combineReducers } from '@reduxjs/toolkit'
import game from './game/slice'
import gamePhase from './gamePhase/slice'

export default combineReducers({ game, gamePhase })