/**
 * Calculate components of the score based on current state of game (curr score, time to match curr element, and current streak number)
 * @param time - the time it has taken to match the current element (gamestate variable)
 * @param score - the current score of the game at the time of calling this function (game-state variable)
 * @param streak - the number of correct matches in a row, part of the game-state
 */
export const computeNewScore = (
  time: number,
  score: number,
  streak: number,
) => {
  const baseCorrectPoints = 1000;
  // return invidiual elements of new score calculation:
  // a base number of points, streakBonus, and timeBonus per correct match.
  return [baseCorrectPoints, streakBonusCalc(streak), timeBonus(time)];
};

/**
 * Gets the streak bonus value to add to the score for the current correct match
 * @param streak a number signifying current streak of correct matches in a row
 * @returns returns the bonus calculated based on the streak number
 */
const streakBonusCalc = (streak: number) => {
  let streakBonus = 0;
  // Set streakBonus amount based on number of correct matches in a row, max bonus is 500 points.
  if (streak === 1) {
    streakBonus = 10;
  } else if (streak === 2) {
    streakBonus = 50;
  } else if (streak === 3) {
    streakBonus = 150;
  } else if (streak === 4) {
    streakBonus = 300;
  } else if (streak > 4) {
    streakBonus = 500;
  }
  streak++;
  return streakBonus;
};

/**
 * Calculates bonus according to amount of time it takes to match the element.
 * Higher bonus is given for finding the elements correctly more quickly,
 * lower bonus given for slower match. Uses exponential decay for the bonus amount based on the time.
 * @param time - time that the user has taken to correctly match in seconds
 */
const timeBonus = (time: number) => {
  const timeBonusMax = 1000; //the maximum number of points that can be added (e.g. quickest match = 0 seconds)
  const decayRate = 0.1; //the rate of exponential decay
  return Math.round(timeBonusMax * Math.exp(-decayRate * time));
};
