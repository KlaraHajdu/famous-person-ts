
export const getRandomNumberFromTo = (from: number, to: number) => {
    return Math.floor(from + Math.random() * (to - from));
  }

export const formTeams = (players: string[]) => {
  // console.log(players)
  // let currentIndex = players.length -1
  // let temporaryValue
  // let randomIndex
  // let temporaryValue2
  // console.log(currentIndex)
  // while (0 !== currentIndex) {
  //   console.log(currentIndex)
  //   randomIndex = Math.floor(Math.random() * currentIndex);
  //   console.log("randomIndex " + randomIndex)
  //   temporaryValue = players[currentIndex];
  //   temporaryValue2 = players[randomIndex]
  //   console.log(players[currentIndex])
  //   console.log(players[randomIndex])
  //   players[randomIndex] = "temporaryValue"
  //   console.log("loop")
  //   players[currentIndex] = temporaryValue2
  //   console.log("loop")
  //   console.log(currentIndex)
  //   console.log("hujujuj")
  //   currentIndex -= 1;
  // }

  const middle = Math.ceil(players.length / 2);
  const blueTeam = players.slice(0, middle);
  const greenTeam = players.slice(middle);
  console.log("formteams")
  return {greenTeam, blueTeam}
}
