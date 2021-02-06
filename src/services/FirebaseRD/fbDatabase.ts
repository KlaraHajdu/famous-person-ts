import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";

export let appFirebase: any = {}; 
firebase.initializeApp(firebaseConfig);
appFirebase = firebase;
firebase.analytics(); 

const readOnceId = async (path: string) => {
    if (!path) return;
     const response = await appFirebase
      .database()
      .ref(path)
      .once("value");
    return response.val()
};

const createNewGame = async (payload: any) => {
    if (!payload.gameId || !payload.gameMaster) {
        return
    }
    const { gameId, gameMaster } = payload
    const body = {gameMaster, gamePhase: 'waitingRoom'}
    console.log(body)
    await appFirebase.database().ref(`games/${gameId}`).set(body)
}

export const databaseApi = {
    readOnceId,
    createNewGame
}
  


