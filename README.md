# Guess!
An application created for playing a guessing game online by a group of 4-12 people. It enables to play this game with friends even within quarantine, with the additional use of a videoconferencing app.

It is built with React - Typescript, Redux toolkit, Bootstrap and styled components, using Firebase Realtime Database.

## Project status
This project is a rewrite of a previous Javascript project: https://github.com/KlaraHajdu/famousperson. It is written in Typescript, using Redux Toolkit. 

The app is deployed at: https://famous-person-guessing-game.web.app/

## How to play the game

The goal: Two teams compete with each other explaining and guessing famous persons within their own teams.

Preparation: First each player submits secretly a few names that the other players probably also know to the game. Once 30 names are gathered, the competition begins.

Starting the first round: The player on turn has 60 seconds to explain the names drawn one after the other to their
teammates. When they have guessed the person, the team scores a point and the player goes on with explaining the next one. The teammates can guess as many times as they want, but the player on turn cannot pass on the name, even if they do not know the person. After 60 seconds it is the other team's turn. The two teams continue like this until all the names are explained in the round.

Three rounds: In the first round the players explain the persons in detail, without telling the name. In the second round the players are only allowed to say a single word, which will help their teammates to guess the person. In the third round the player on turn can only pantomime without saying anything. After the three rounds the team with higher scores wins.

Variations: It is upon agreement if only real life persons or also fictious characters can be guessed in the game. For advanced level you can agree on a limited topic (e.g. only musicians) or concepts instead of persons.
                   
Playing the game with the app: Start a new game as a game master and send the game ID to your friends to join. Submit names
online, form random teams and let the game begin! When it is your turn just hit the button once you are ready and explain or pantomime the name appearing on your screen to your teammates. All you need in addition is a videoconferencing app to hear and see your teammates.

## Screenshot from the app

![Play game phase](src/static/screenshot.jpg?raw=true "Play game")

## Installation and Setup Instructions

`yarn start` Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. Firebase related environment variables are needed to run the app locally. 

`yarn test` Launches the test runner in the interactive watch mode.
