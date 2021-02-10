
export const getRandomNumberFromTo = (from: number, to: number) => {
    return Math.floor(from + Math.random() * (to - from));
  }

export const formTeams = (playersOriginal: string[]) => {
 
  let players = [...playersOriginal]
  let currentIndex = players.length
  let temporaryValue
  let randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = players[currentIndex];
    players[currentIndex] = players[randomIndex]; 
    players[randomIndex] = temporaryValue;
  }

  const middle = Math.ceil(players.length / 2);
  const blueTeam = players.slice(0, middle);
  const greenTeam = players.slice(middle);
  return {greenTeam, blueTeam}
}
