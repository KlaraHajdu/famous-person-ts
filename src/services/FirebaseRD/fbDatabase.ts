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

const checkIfPlayerNameExists = async (gameId: number, name: string) => {
    const players = await appFirebase
     .database()
     .ref(`games/${gameId}/players`)
     .once("value")
    
    const playersLowerCase = Object.keys(players.val()).map((name) => name.toLowerCase())
    return playersLowerCase.includes(name.toLowerCase())
}

const createNewGame = async (payload: any) => {
    if (!payload.gameId || !payload.gameMaster) {
        return
    }
    const { gameId, gameMaster } = payload
    const ownName = gameMaster //check!!!!

    const body = { gameMaster, gamePhase: 'waitingRoom' }
    await appFirebase.database().ref(`games/${gameId}`).set(body)
    await appFirebase.database().ref(`games/${gameId}/players/${ownName}`).set(true)
}

const joinGame = async (payload: any) => {
    if (!payload.gameId || !payload.ownName) {
        return
    }
    const { gameId, ownName } = payload
    await appFirebase.database().ref(`games/${gameId}/players/${ownName}`).set(true)
}

const subscribeToGame = async (gameId: number, callback: (gameMaster:any) => void) => {
    const observer = (snapshot: any) => {
        callback(snapshot.val())
    }
    console.log(gameId)
    await appFirebase.database().ref(`games/${gameId}`).on("value", observer)
}

const subscribeToGamePhase = async (gameId: number, callback: (gameMaster:any) => void) => {
    const observer = (snapshot: any) => {
        callback(snapshot.val())
    }
    await appFirebase.database().ref(`games/${gameId}/gamePhase`).on("value", observer)
}

const changeGamePhase = async (gamePhase: GamePhase, gameId: string) => {
    const gamePhaseString = gamePhase.toString()
    console.log(gamePhase)
    await appFirebase.database().ref(`games/${gameId}/gamePhase`).set(gamePhaseString)
}

const setTeams = async (greenTeam: string[], blueTeam:  string[], gameId: string) => {
    if (!greenTeam || !blueTeam || !gameId) {
        return
    }
    const teams = {greenTeam, blueTeam}
    await appFirebase.database().ref(`games/${gameId}/teams`).set(teams)
}

export const databaseApi = {
    checkIfGameIdExists,
    checkIfPlayerNameExists,
    createNewGame,
    joinGame,
    subscribeToGame,
    subscribeToGamePhase,
    changeGamePhase,
    setTeams
}
  


