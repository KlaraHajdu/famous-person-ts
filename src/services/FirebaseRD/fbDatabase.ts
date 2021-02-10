import firebase from "firebase";
import GamePhase from "../../types/GamePhase";
import { firebaseConfig } from "./firebaseConfig";

export let appFirebase: any = {}; 
firebase.initializeApp(firebaseConfig);
appFirebase = firebase;
firebase.analytics(); 

const checkIfGameIdExists = async (gameId: string) => {
     const response = await appFirebase
      .database()
      .ref(`games/${gameId}`)
      .once("value");
    return response.val()
};

const checkIfPlayerNameExists = async (gameId: string, name: string) => {
    const players = await appFirebase
     .database()
     .ref(`games/${gameId}/players`)
     .once("value")
    
    const playersLowerCase = Object.keys(players.val()).map((name) => name.toLowerCase())
    return playersLowerCase.includes(name.toLowerCase())
}

const checkIfNameExists = async (gameId: string, name: string) => {
    const greenNames = await appFirebase
     .database()
     .ref(`games/${gameId}/names/greenTeam`)
     .once("value")
    
     const blueNames = await appFirebase
     .database()
     .ref(`games/${gameId}/names/blueTeam`)
        .once("value")
    if (!greenNames.val() && !blueNames.val()) {
        return false
    }
    let blueNamesLowerCase
    let greenNamesLowerCase

    if (!greenNames.val()) {
        blueNamesLowerCase = Object.keys(blueNames.val()).map((name) => name.toLowerCase())
        return blueNamesLowerCase.includes(name)
    }

    if (!blueNames.val()) {
        greenNamesLowerCase = Object.keys(greenNames.val()).map((name) => name.toLowerCase())
        return greenNamesLowerCase.includes(name)
    }
    
    blueNamesLowerCase = Object.keys(blueNames.val()).map((name) => name.toLowerCase())
    greenNamesLowerCase = Object.keys(greenNames.val()).map((name) => name.toLowerCase())
    const allNamesLowerCase = blueNamesLowerCase.concat(greenNamesLowerCase)
    return allNamesLowerCase.includes(name.toLowerCase())
}

const createNewGame = async (gameId: string, gameMaster: string) => {
    if (!gameId || !gameMaster) {
        return
    }
    const body = { gameMaster, gamePhase: 'waitingRoom' }
    await appFirebase.database().ref(`games/${gameId}`).set(body)
    await appFirebase.database().ref(`games/${gameId}/players/${gameMaster}`).set(true)
}

const joinGame = async (gameId: string, ownName: string) => {
    if (!gameId || !ownName) {
        return
    }
    await appFirebase.database().ref(`games/${gameId}/players/${ownName}`).set(true)
}

const subscribeToGame = async (gameId: string, callback: (gameMaster:any) => void) => {
    const observer = (snapshot: any) => {
        callback(snapshot.val())
    }
    console.log(gameId)
    await appFirebase.database().ref(`games/${gameId}`).on("value", observer)
}

const subscribeToGamePhase = async (gameId: string, callback: (gameMaster:any) => void) => {
    const observer = (snapshot: any) => {
        callback(snapshot.val())
    }
    await appFirebase.database().ref(`games/${gameId}/gamePhase`).on("value", observer)
}

const changeGamePhase = async (gameId: string, gamePhase: GamePhase) => {
    const gamePhaseString = gamePhase.toString()
    await appFirebase.database().ref(`games/${gameId}/gamePhase`).set(gamePhaseString)
}

const setTeams = async (gameId: string, greenTeam: string[], blueTeam:  string[]) => {
    if (!greenTeam || !blueTeam || !gameId) {
        return
    }
    const teams = {greenTeam, blueTeam}
    await appFirebase.database().ref(`games/${gameId}/teams`).set(teams)
}

const addName = async (gameId: string, newName: string, team: string) => {
    await appFirebase.database().ref(`games/${gameId}/names/${team}/${newName}`).set(true)
}

const startPlay = async (gameId: string, date: string) => {
    await appFirebase.database().ref(`games/${gameId}/_date`).set(date)
    await appFirebase.database().ref(`games/${gameId}/teamOnTurn`).set("greenTeam")
    await appFirebase.database().ref(`games/${gameId}/greenTeamTurnIndex`).set(0)
    await appFirebase.database().ref(`games/${gameId}/blueTeamTurnIndex`).set(0)
    await appFirebase.database().ref(`games/${gameId}/round`).set(1)
    await appFirebase.database().ref(`games/${gameId}/turnOngoing`).set(false)
    const greenNames = await appFirebase
     .database()
     .ref(`games/${gameId}/names/greenTeam`)
     .once("value")
    
     const blueNames = await appFirebase
     .database()
     .ref(`games/${gameId}/names/blueTeam`)
        .once("value")
    
    const allNames = { ...blueNames.val(), ...greenNames.val() }
    await appFirebase.database().ref(`games/${gameId}/round1`).set(allNames)
    await appFirebase.database().ref(`games/${gameId}/round2`).set(allNames)
    await appFirebase.database().ref(`games/${gameId}/round3`).set(allNames)
    await appFirebase.database().ref(`games/${gameId}/blueTeamScore`).set(0)
    await appFirebase.database().ref(`games/${gameId}/greenTeamScore`).set(0)
}


const updateTurnOngoing = async (gameId: string, turnOngoing: boolean) => {
    await appFirebase.database().ref(`games/${gameId}/turnOngoing`).set(`${ turnOngoing}`)
}

const updateRound = async (gameId: string, round: number) => {
    await appFirebase.database().ref(`games/${gameId}/round`).set(round+1)
}

const updateTeamOnTurn = async (gameId: string, team: string) => {
    await appFirebase.database().ref(`games/${gameId}/teamOnTurn`).set(team)
}

const updatePlayerIndex = async (gameId: string, teamIndex: string, nextPlayerIndex: number) => {
    await appFirebase.database().ref(`games/${gameId}/${teamIndex}`).set(nextPlayerIndex)
}

const deleteWordFromRound = async (gameId: string, round: number, word: string) => {
    await appFirebase.database().ref(`games/${gameId}/round${round}/${word}`).set(false)
}

const updateScore = async (gameId: string, team: string, updatedScore: number) => {
    await appFirebase.database().ref(`games/${gameId}/${team}Score`).set(updatedScore)
}

export const databaseApi = {
    checkIfGameIdExists,
    checkIfPlayerNameExists,
    checkIfNameExists,
    createNewGame,
    joinGame,
    subscribeToGame,
    subscribeToGamePhase,
    changeGamePhase,
    setTeams,
    addName,
    startPlay,
    updateTurnOngoing,
    updateRound,
    updateTeamOnTurn,
    updatePlayerIndex,
    deleteWordFromRound,
    updateScore
}
  


