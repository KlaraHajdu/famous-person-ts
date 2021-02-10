
export const getRandomNumberFromTo = (from: number, to: number) => {
    return Math.floor(from + Math.random() * (to - from));
  }

export const formTeams = (players: string[]) => {
 
  // console.log(players)
  // let currentIndex = players.length
  // let temporaryValue
  // let randomIndex
  // while (0 !== currentIndex) {
  //   console.log("currentIndex: " + currentIndex)
  //   randomIndex = Math.floor(Math.random() * currentIndex);
  //   currentIndex -= 1;
  //   console.log(currentIndex) 
  //   temporaryValue = players[currentIndex];
  //   console.log(temporaryValue) //  utsó index a tömbben
  //   players[currentIndex] = players[randomIndex]; 
  //   console.log(players)
  //   players[randomIndex] = temporaryValue;
  //   console.log(players)
  //   console.log(currentIndex)
  //   console.log("hujujuj")
  // }
  // console.log(players)

  const middle = Math.ceil(players.length / 2);
  const blueTeam = players.slice(0, middle);
  const greenTeam = players.slice(middle);
  return {greenTeam, blueTeam}
}
