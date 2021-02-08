
export const getRandomNumberFromTo = (from: number, to: number) => {
    return Math.floor(from + Math.random() * (to - from));
  }

export const formTeams = (players: string[]) => {
 
  const middle = Math.ceil(players.length / 2);
  const blueTeam = players.slice(0, middle);
  const greenTeam = players.slice(middle);
  return {greenTeam, blueTeam}
}
