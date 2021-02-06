export const getRandomNumberFromTo = (from: number, to: number) => {
    return Math.floor(from + Math.random() * (to - from));
  }

export const shuffle = (array: string[]) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
