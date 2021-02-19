import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import gameReducer, { gameActions, asyncGameActions } from "./slice";
import { databaseApi } from "../../../services/FirebaseRD/fbDatabase";

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    game: {
        gameId: 1111,
        ownName: "fake_player",
        gameMaster: "fake_gameMaster",
        ownTeam: "greenTeam",
        players: ["fake_player", "fake_gameMaster", "fake_player2", "fake_player3", "fake_player5", "fake_player6"],
        round: 1,
        teamOnTurn: "greenTeam",
        greenPlayerIndex: 0,
        bluePlayerIndex: 0,
        turnOngoing: false,
        blueTeamScore: 0,
        greenTeamScore: 0,
        greenTeam: ["fake_player", "fake_gameMaster", "fake_player5"],
        blueTeam: ["fake_player2", "fake_player3", "fake_player6"],
        names: {
            greenTeam: ["name", "name4"],
            blueTeam: ["name2", "name3"],
        },
        round1Names: ["word", "word1", "word2", "word3"],
        round2Names: ["word", "word1", "word2", "word3"],
        round3Names: ["word", "word1", "word2", "word3"],
    },
});

const storeAfterPlayerOnTurnDeleted = mockStore({
    game: {
        gameId: 1111,
        ownName: "fake_player",
        gameMaster: "fake_gameMaster",
        ownTeam: "greenTeam",
        players: ["fake_player", "fake_gameMaster", "fake_player2", "fake_player3", "fake_player5", "fake_player6"],
        round: 1,
        teamOnTurn: "greenTeam",
        greenPlayerIndex: 3,
        bluePlayerIndex: 3,
        turnOngoing: false,
        blueTeamScore: 0,
        greenTeamScore: 0,
        greenTeam: ["fake_player", "fake_gameMaster", "fake_player5"],
        blueTeam: ["fake_player2", "fake_player3", "fake_player6"],
        names: {
            greenTeam: ["name", "name4"],
            blueTeam: ["name2", "name3"],
        },
        round1Names: ["word", "word1", "word2", "word3"],
        round2Names: ["word", "word1", "word2", "word3"],
        round3Names: ["word", "word1", "word2", "word3"],
    },
});

jest.mock("../../../services/FirebaseRD/fbDatabase")
const mockedDatabaseApi = databaseApi as jest.Mocked<typeof databaseApi>

jest.mock('moment', () => () => ({ format: () => "Tuesday, February 16, 2021 11:26 PM" }));

describe("Game slice", () => { 
    beforeEach(() => {
        window.sessionStorage.clear()
    })
    it("reducer with GAME_CREATED action sets the state to the correct value", () => {
        const state: any = { gameId: null, ownName: null, gameMaster:null }
        const newGame = {gameId: 1234, ownName: "fake_player", gameMaster: "fake_GameMaster"}
        const nextState = gameReducer(state, gameActions.GAME_CREATED(newGame))
        
        expect(nextState).toEqual(newGame)
        expect(sessionStorage.getItem("gameId")).toEqual("1234")
        expect(sessionStorage.getItem("ownName")).toEqual("fake_player")
        expect(sessionStorage.getItem("gameMaster")).toEqual("fake_GameMaster")
    })
    it("reducer with GAME_UPDATED action sets the state of GameMaster to the correct value", () => {
        const state: any = { gameMaster: null }
        const newState = { gameMaster: "fake_GameMaster" }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))
    
        expect(nextState).toEqual(newState)
        expect(sessionStorage.getItem("gameMaster")).toEqual("fake_GameMaster")
    })
    it("reducer with GAME_UPDATED action sets the state of round to the correct value", () => {
        const state: any = { round: 1 }
        const newState = { round: 2 }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))
    
        expect(nextState).toEqual(newState)
        expect(sessionStorage.getItem("round")).toEqual("2")
    
    })
    it("reducer with GAME_UPDATED action sets the state of teamOnTurn to the correct value", () => {
        const state: any = { teamOnTurn: "greenTeam" }
        const newState = { teamOnTurn: "blueTeam" }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))
    
        expect(nextState).toEqual(newState)
        expect(sessionStorage.getItem("teamOnTurn")).toEqual("blueTeam")
    })
    it("reducer with GAME_UPDATED action sets the state of greenPlayerIndex to the correct value", () => {
        const state: any = { greenPlayerIndex: 1 }
        const newState = { greenPlayerIndex: 2 }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))
    
        expect(nextState).toEqual(newState)
        expect(sessionStorage.getItem("greenPlayerIndex")).toEqual("2")
    })
    it("reducer with GAME_UPDATED action sets the state of bluePlayerIndex to the correct value", () => {
        const state: any= { bluePlayerIndex: 1 }
        const newState = { bluePlayerIndex: 2 }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))
    
        expect(nextState).toEqual(newState)
        expect(sessionStorage.getItem("bluePlayerIndex")).toEqual("2")
    })
    it("reducer with GAME_UPDATED action sets the state of blueTeamScore to the correct value", () => {
        const state: any = { blueTeamScore: 23 }
        const newState = { blueTeamScore: 24 }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))
    
        expect(nextState).toEqual(newState)
        expect(sessionStorage.getItem("blueTeamScore")).toEqual("24")
    })
    it("reducer with GAME_UPDATED action sets the state of greenTeamScore to the correct value", () => {
        const state: any = { greenTeamScore: 23 }
        const newState = { greenTeamScore: 24 }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))
    
        expect(nextState).toEqual(newState)
        expect(sessionStorage.getItem("greenTeamScore")).toEqual("24")
    })
    it("reducer with GAME_UPDATED action sets the state of turnOngoing to the correct value", () => {
        const state: any = { turnOngoing: false }
        const newState = { turnOngoing: true }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))
    
        expect(nextState).toEqual(newState)
        expect(sessionStorage.getItem("turnOngoing")).toEqual("true")
    })
    it("reducer with GAME_UPDATED action sets the state of players to the correct value", () => {
        const state: any = { players:  ["fake_player", "fake_gameMaster"] }
        const newState = { players: { "fake_player": true, "fake_gameMaster": true,  "fake_new_player": true } }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))
    
        expect(nextState).toEqual({ players: ["fake_player", "fake_gameMaster", "fake_new_player"] })
        expect(sessionStorage.getItem("players")).toEqual("fake_player,fake_gameMaster,fake_new_player")
    })
    it("reducer with GAME_UPDATED action sets the state of greenTeam and blueTeam to the correct value", () => {
        const state: any = { greenTeam:  null, blueTeam: null, ownName: "fake_player4" }
        const newState: any = {
            teams:{
            greenTeam: { 0: "fake_player", 1: "fake_gameMaster", 2: "fake_player2" }, 
            blueTeam: { 0: "fake_player3", 1: "fake_player4", 2: "fake_player5" }
            }
        }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))
    
        const updatedStateNewTeams = {
            greenTeam: ["fake_player", "fake_gameMaster", "fake_player2"],
            blueTeam: ["fake_player3", "fake_player4", "fake_player5"],
            ownName: "fake_player4",    
            ownTeam: "blueTeam",   
        }
        expect(nextState).toEqual(updatedStateNewTeams)
        expect(sessionStorage.getItem("greenTeam")).toEqual("fake_player,fake_gameMaster,fake_player2")
        expect(sessionStorage.getItem("blueTeam")).toEqual("fake_player3,fake_player4,fake_player5")
        expect(sessionStorage.getItem("ownTeam")).toEqual("blueTeam")
    })
    it("reducer with GAME_UPDATED action sets the state of submitted names to the correct value", () => {
        const state: any = { names: { greenTeam: [], blueTeam: [] } }
        const newState: any = {
            names:{
            greenTeam: { "name1": true }, 
            blueTeam: {"name3": true, "name4": true  }
            }
        }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))
    
        const updatedStateNames = {
            names: {
                greenTeam: ["name1"],
                blueTeam: ["name3", "name4"]
            }
        }
        expect(nextState).toEqual(updatedStateNames)
        expect(sessionStorage.getItem("greenTeamNames")).toEqual("name1")
        expect(sessionStorage.getItem("blueTeamNames")).toEqual("name3,name4")
    })
    it("reducer with GAME_UPDATED action sets the state of names in the 1st round to the correct value", () => {
        const state: any = {  round1Names: ["name1", "name2"] }
        const newState: any = {
            round1:{ "name1": true, "name2": false, "name3": false}
        }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))

        expect(nextState).toEqual({round1Names: ["name1"]})
        expect(sessionStorage.getItem("round1Names")).toEqual("name1")
    })
    it("reducer with GAME_UPDATED action sets the state of names in the 2nd round to the correct value", () => {
        const state: any = {  round2Names: ["name1", "name2", "name3"] }
        const newState: any = {
            round2:{ "name1": true, "name2": true, "name3": false}
        }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))

        expect(nextState).toEqual({round2Names: ["name1", "name2"]})
        expect(sessionStorage.getItem("round2Names")).toEqual("name1,name2")
    })
    it("reducer with GAME_UPDATED action sets the state of names in the 3rd round to the correct value", () => {
        const state: any = {  round3Names: ["name1"] }
        const newState: any = {
            round3:{ "name1": false, "name2": false, "name3": false}
        }
        const nextState = gameReducer(state, gameActions.GAME_UPDATED(newState))
    
        expect(nextState).toEqual({round3Names: []})
        expect(sessionStorage.getItem("round3Names")).toEqual("")
    })
    it("reducer with GAME_JOINED action sets the state to the correct value", () => {
        const state: any = { gameId: null, ownName: null }
        const newGame = {gameId: 1234, ownName: "fake_player"}
        const nextState = gameReducer(state, gameActions.GAME_JOINED(newGame))
        
        expect(nextState).toEqual(newGame)
        expect(sessionStorage.getItem("gameId")).toEqual("1234")
        expect(sessionStorage.getItem("ownName")).toEqual("fake_player")
    })
    it("reducer with TEAMONTURN_UPDATED action sets the state to the correct value", () => {
        const state: any = { teamOnTurn: "blueTeam" }
        const newState = { teamOnTurn: "greenTeam" }
        const nextState = gameReducer(state, gameActions.TEAMONTURN_UPDATED(newState))
        
        expect(nextState).toEqual(newState)
        expect(sessionStorage.getItem("teamOnTurn")).toEqual("greenTeam")
    })
    it("reducer with GREENPLAYERINDEX_UPDATED action sets the state to the correct value", () => {
        const state: any = { greenPlayerIndex: 2}
        const nextState = gameReducer(state, gameActions.GREENPLAYERINDEX_UPDATED(3))
        
        expect(nextState).toEqual({ greenPlayerIndex: 3})
        expect(sessionStorage.getItem("greenPlayerIndex")).toEqual("3")
    })
    it("reducer with BLUEPLAYERINDEX_UPDATED action sets the state to the correct value", () => {
        const state: any = { bluePlayerIndex: 0}
        const nextState = gameReducer(state, gameActions.BLUEPLAYERINDEX_UPDATED(1))
        
        expect(nextState).toEqual({ bluePlayerIndex: 1})
        expect(sessionStorage.getItem("bluePlayerIndex")).toEqual("1")
    })
})

describe("checkIfGameExists async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
          })
          store.clearActions()
    })
    it("returns the right action if gameId exists", async () => {
        mockedDatabaseApi.checkIfGameIdExists.mockResolvedValueOnce(true)

        await store.dispatch(asyncGameActions.checkIfGameExists("1234"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/checkifgameidexists/fulfilled')
        expect(actions[1].payload).toEqual(true)
    })
    it("returns the right action if gameId does not exist", async () => {
        mockedDatabaseApi.checkIfGameIdExists.mockResolvedValueOnce(false)

        await store.dispatch(asyncGameActions.checkIfGameExists("1234"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/checkifgameidexists/fulfilled')
        expect(actions[1].payload).toEqual(false)
    })
    it("returns error action if database is down", async () => {
        mockedDatabaseApi.checkIfGameIdExists.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.checkIfGameExists("1234"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/checkifgameidexists/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("checkIfPlayerNameExists async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right action if player name exists", async () => {
        mockedDatabaseApi.checkIfPlayerNameExists.mockResolvedValueOnce(true)

        await store.dispatch(asyncGameActions.checkIfPlayerNameExists({ gameId: "1234", ownName: "Myname" }))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/checkifplayernameexists/fulfilled')
        expect(actions[1].payload).toEqual(true)
    })
    it("returns the right action if player name does not exist", async () => {
        mockedDatabaseApi.checkIfPlayerNameExists.mockResolvedValueOnce(false)

        await store.dispatch(asyncGameActions.checkIfPlayerNameExists({ gameId: "1234", ownName: "Myname" }))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/checkifplayernameexists/fulfilled')
        expect(actions[1].payload).toEqual(false)
    })
    it("returns error action if database is down", async () => {
        mockedDatabaseApi.checkIfPlayerNameExists.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.checkIfPlayerNameExists({ gameId: "1234", ownName: "Myname" }))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/checkifplayernameexists/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("createNewGame async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right actions if game is created", async () => {
        mockedDatabaseApi.createNewGame.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.createNewGame({ gameId: "1234", gameMaster: "Myname" }))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/GAME_CREATED')
        expect(actions[2].type).toEqual('game/createnewgame/fulfilled')
    })
    it("returns the right action if database is down", async () => {
        mockedDatabaseApi.createNewGame.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.createNewGame({ gameId: "1234", gameMaster:"MyName" }))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/createnewgame/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("joinGame async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right actions if game is joined", async () => {
        mockedDatabaseApi.joinGame.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.joinGame({ gameId: "1234", ownName: "Myname" }))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/GAME_JOINED')
        expect(actions[2].type).toEqual('game/joingame/fulfilled')
    })
    it("returns the right action if database is down", async () => {
        mockedDatabaseApi.joinGame.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.joinGame({ gameId: "1234", ownName:"MyName" }))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/joingame/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("subscribeToGame async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right action if subscribed to game", async () => {
        mockedDatabaseApi.subscribeToGame.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.subscribeToGame("1234"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/subscribetogame/fulfilled')
        expect(actions[1].payload).toEqual('subscribed_to_game')
    })
    it("returns the right action if database is down", async () => {
        mockedDatabaseApi.subscribeToGame.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.subscribeToGame("1234"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/subscribetogame/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("unsubscribeFromGame async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right action if unsubscribed from game", async () => {
        mockedDatabaseApi.unsubscribeFromGame.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.unsubscribeFromGame("1234"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/unsubscribefromgame/fulfilled')
        expect(actions[1].payload).toEqual('unsubscribed_from_game')
    })
    it("returns the right action if database is down", async () => {
        mockedDatabaseApi.unsubscribeFromGame.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.unsubscribeFromGame("1234"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/unsubscribefromgame/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("createTeams async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right actions if teams are created", async () => {
        mockedDatabaseApi.setTeams.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.createTeams("1234"))

        const actions = store.getActions()
        expect(actions[2].type).toEqual('game/createteams/fulfilled')
        expect(actions[2].payload).toEqual('teams_created_in_database')
        expect(actions[3].type).toEqual('gamephase/changegamephase/fulfilled')
    })
    it("returns the right action if database is down", async () => {
        mockedDatabaseApi.setTeams.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.createTeams("1234"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/createteams/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("checkIfNameExists async action", () => {
        beforeEach(() => {
            Object.values(mockedDatabaseApi).forEach((fn) => {
                fn.mockReset()
              })
              store.clearActions()
        })
    it("returns right value if submitted name exists", async () => {
        mockedDatabaseApi.checkIfNameExists.mockResolvedValueOnce(true)

        await store.dispatch(asyncGameActions.checkIfNameExists( "Santa" ))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/checkifnameexists/fulfilled')
        expect(actions[1].payload).toEqual('name_checked_if_exists')
    })
    it("dispatches right actions if name does not exist", async () => {
        mockedDatabaseApi.checkIfNameExists.mockResolvedValueOnce(false)

        await store.dispatch(asyncGameActions.checkIfNameExists( "Santa" ))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/addname/pending')
        expect(actions[2].type).toEqual('game/checkifnameexists/fulfilled')
        expect(actions[2].payload).toEqual('name_checked_if_exists')
    })
    it("returns error message if database is down", async () => {
        mockedDatabaseApi.checkIfNameExists.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.checkIfNameExists( "Santa" ))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/checkifnameexists/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("addName async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right action if name is added", async () => {
        mockedDatabaseApi.addName.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.addName("Santa"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/addname/fulfilled')
        expect(actions[1].payload).toEqual('name_added_in_database')
    })
    it("returns the right error action if database is down", async () => {
        mockedDatabaseApi.addName.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.addName("Santa"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/addname/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("startPlay async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right action if game is started", async () => {
        mockedDatabaseApi.startPlay.mockResolvedValueOnce()
        

        await store.dispatch(asyncGameActions.startPlay("1234"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/startplay/fulfilled')
        expect(actions[1].payload).toEqual('initial_playstate_uploaded_in_database')
    })
    it("returns the right error action if database is down", async () => {
        mockedDatabaseApi.startPlay.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.startPlay("1234"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/startplay/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("updateTurnOngoing async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right action if turnOngoing is updated", async () => {
        mockedDatabaseApi.updateTurnOngoing.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.updateTurnOngoing(true))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/updateturnongoing/fulfilled')
        expect(actions[1].payload).toEqual('turnOngoing_updated_in_database')
    })
    it("returns the right error action if database is down", async () => {
        mockedDatabaseApi.updateTurnOngoing.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.updateTurnOngoing(false))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/updateturnongoing/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("updateRound async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right action if round is updated", async () => {
        mockedDatabaseApi.updateRound.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.updateRound(2))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/updateround/fulfilled')
        expect(actions[1].payload).toEqual('round_updated_in_database')
    })
    it("returns the right error action if database is down", async () => {
        mockedDatabaseApi.updateRound.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.updateRound(3))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/updateround/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("updateTeamOnTurn async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right action if teamOnturn is updated", async () => {
        mockedDatabaseApi.updateTeamOnTurn.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.updateTeamOnTurn("greenTeam"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/updateteamonturn/fulfilled')
        expect(actions[1].payload).toEqual('teamOnTurn_updated_in_database')
    })
    it("returns the right error action if database is down", async () => {
        mockedDatabaseApi.updateTeamOnTurn.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.updateTeamOnTurn("blueTeam"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/updateteamonturn/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("updatePlayerIndex async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
        storeAfterPlayerOnTurnDeleted.clearActions()
    })
    it("returns the right action if green playerIndex is updated", async () => {
        mockedDatabaseApi.updatePlayerIndex.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.updatePlayerIndex({ teamIndex: "greenPlayerIndex", nextIndex: 1}))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/updateplayerindex/fulfilled')
        expect(actions[1].payload).toEqual('playerIndex_updated_in_database')
    })
    it("returns the right action if blue playerIndex is updated", async () => {
        mockedDatabaseApi.updatePlayerIndex.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.updatePlayerIndex({ teamIndex: "bluePlayerIndex", nextIndex: 1}))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/updateplayerindex/fulfilled')
        expect(actions[1].payload).toEqual('playerIndex_updated_in_database')
    })
    it("returns the right error action if database is down", async () => {
        mockedDatabaseApi.updatePlayerIndex.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.updatePlayerIndex({ teamIndex: "greenPlayerIndex", nextIndex: 2}))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/updateplayerindex/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("deleteWordFromRound async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right action if word is deleted from round", async () => {
        mockedDatabaseApi.deleteWordFromRound.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.deleteWordFromRound("Santa"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/deletewordfromround/fulfilled')
        expect(actions[1].payload).toEqual('word_deleted_in_database')
    })
    it("returns the right error action if database is down", async () => {
        mockedDatabaseApi.deleteWordFromRound.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.deleteWordFromRound("Santa"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/deletewordfromround/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("deleteDuplicateWord async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right action if duplicate word is deleted", async () => {
        mockedDatabaseApi.deleteDuplicateWord.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.deleteDuplicateWord("Santa"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/deleteduplicateword/fulfilled')
        expect(actions[1].payload).toEqual('duplicate_word_deleted_in_database')
    })
    it("returns the right error action if database is down", async () => {
        mockedDatabaseApi.deleteDuplicateWord.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.deleteDuplicateWord("Santa"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/deleteduplicateword/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("deletePlayer async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right action if player is deleted", async () => {
        mockedDatabaseApi.deletePlayer.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.deletePlayer({team: "greenTeam", players: ["player1", "player2"]}))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/deleteplayer/fulfilled')
        expect(actions[1].payload).toEqual('player_deleted_in_database')
    })
    it("returns the right error action if database is down", async () => {
        mockedDatabaseApi.deletePlayer.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.deletePlayer({team: "greenTeam", players: ["player1", "player2"]}))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/deleteplayer/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

describe("updateScore async action", () => {
    beforeEach(() => {
        Object.values(mockedDatabaseApi).forEach((fn) => {
            fn.mockReset()
        })
        store.clearActions()
    })
    it("returns the right action if score is updated", async () => {
        mockedDatabaseApi.updateScore.mockResolvedValueOnce()

        await store.dispatch(asyncGameActions.updateScore("greenTeam"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/updatescore/fulfilled')
        expect(actions[1].payload).toEqual('score_updated_in_database')
    })
    it("returns the right error action if database is down", async () => {
        mockedDatabaseApi.updateScore.mockRejectedValueOnce("database down")

        await store.dispatch(asyncGameActions.updateScore("greenTeam"))

        const actions = store.getActions()
        expect(actions[1].type).toEqual('game/updatescore/rejected')
        expect(actions[1].payload).toEqual("database_down")
    })
})

