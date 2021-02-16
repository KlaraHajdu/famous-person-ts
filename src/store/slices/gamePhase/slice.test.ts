import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import gamePhaseReducer, { gamePhaseActions, asyncGamePhaseActions } from "./slice";
import { databaseApi } from "../../../services/FirebaseRD/fbDatabase";
import GamePhase from "../../../types/GamePhase";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    game: {
        gamePhase: null,
        modalOpened: false
    },
});

jest.mock("../../../services/FirebaseRD/fbDatabase")
const mockedDatabaseApi = databaseApi as jest.Mocked<typeof databaseApi>

describe("Gamephase slice", () => { 
    it("reducer with NEXT_GAMEPHASE_ENTERED action sets the state to the correct value", () => {
        const state = {gamePhase: GamePhase.START_GAME, modalOpened: false}
        const nextState = gamePhaseReducer(state, gamePhaseActions.NEXT_GAMEPHASE_ENTERED(GamePhase.WAITING_ROOM))
        
        expect(nextState).toEqual({gamePhase: GamePhase.WAITING_ROOM, modalOpened: false})
    })
    it("reducer with HOWTOPLAYMODAL_TOGGLED action sets the state to the correct value", () => {
        const state = {gamePhase: GamePhase.WAITING_ROOM, modalOpened: false}
        const nextState = gamePhaseReducer(state, gamePhaseActions.HOWTOPLAYMODAL_TOGGLED(true))
        
        expect(nextState).toEqual({gamePhase: GamePhase.WAITING_ROOM, modalOpened: true})
    })
})

describe("changeGamePhase async thunk", () => {
    beforeEach(() => {
        store.clearActions()
        jest.clearAllMocks()
    });
    it("dispatches action successfully", async () => {
        mockedDatabaseApi.changeGamePhase.mockResolvedValue()
        const result = await store.dispatch(asyncGamePhaseActions.changeGamePhase(GamePhase.START_GAME))

        expect(result.type).toEqual("gamephase/changegamephase/fulfilled")
        expect(result.payload).toEqual('gamephase_updated_in_db')
    }) 
    it("dispatches error action if database is down", async () => {
        mockedDatabaseApi.changeGamePhase.mockRejectedValue(new Error("database down"))
        await store.dispatch(asyncGamePhaseActions.changeGamePhase(GamePhase.START_GAME))

        const actions = store.getActions()
        expect(actions[1].type).toEqual("gamephase/changegamephase/rejected")
        expect(actions[1].payload).toEqual('database_down')
    })  
})


describe("subscribeToGamePhase async thunk", () => {
    beforeEach(() => {
        store.clearActions()
        jest.clearAllMocks()
    });
    it("dispatches action successfully", async () => {
        mockedDatabaseApi.changeGamePhase.mockReturnValue(new Promise(() => {}))
        const result = await store.dispatch(asyncGamePhaseActions.subscribeToGamePhase("fakeId"))

        expect(result.type).toEqual("gamephase/subscribetogamephase/fulfilled")
        expect(result.payload).toEqual('subscribed_to_gamephase')
    }) 
    it("dispatches error action if database is down", async () => {
        mockedDatabaseApi.subscribeToGamePhase.mockRejectedValue(new Error("database down"))
        const result = await store.dispatch(asyncGamePhaseActions.subscribeToGamePhase("fakeId"))

        expect(result.type).toEqual("gamephase/subscribetogamephase/rejected")
        expect(result.payload).toEqual('database_down')
    })  
})