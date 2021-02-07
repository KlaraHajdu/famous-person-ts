import firebase from "firebase";
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

const subscribeToGame = async (payload: number, callback: (gameMaster:any) => void) => {
    const observer = (snapshot: any) => {
        callback(snapshot.val())
    }
    console.log(payload)
    await appFirebase.database().ref(`games/${payload}`).on("value", observer)
}

const subscribeToGamePhase = async (payload: number, callback: (gameMaster:any) => void) => {
    const observer = (snapshot: any) => {
        console.log(snapshot.val())
        callback(snapshot.val())
    }
    console.log(payload)
    await appFirebase.database().ref(`games/${payload}/gamePhase`).on("value", observer)
}

export const databaseApi = {
    checkIfGameIdExists,
    checkIfPlayerNameExists,
    createNewGame,
    joinGame,
    subscribeToGame,
    subscribeToGamePhase
}
  


