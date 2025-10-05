interface IExercisesOutput {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// {
//   periodLength: 7,
//   trainingDays: 5,
//   success: false,
//   rating: 2,
//   ratingDescription: 'not too bad but could be better',
//   target: 2,
//   average: 1.9285714285714286
// }

const demo = [3, 0, 2, 4.5, 0, 3, 1];

export const exerciseCalculator = (
  timeArr: number[],
  targetTime?: number
): IExercisesOutput => {
  let totalTime = 0;
  for (let index = 0; index < timeArr.length; index++) {
    const element = timeArr[index];
    totalTime = element + totalTime;
  }

  const averageTime = totalTime / timeArr.length;
  const trainingDays = timeArr.filter((v) => v > 0);
  const success =
    averageTime >= (targetTime || 2) && trainingDays.length === timeArr.length;
  return {
    periodLength: timeArr.length,
    trainingDays: trainingDays.length,
    success,
    rating: Math.random() * (3 - 1) + 1,
    ratingDescription: 'not too bad but could be better',
    target: targetTime || 2,
    average: averageTime,
  };
};

// npm run calculateExercises -- "[2,1,0,2,4.5,0,3,1,0,4]"
// const timeArr = JSON.parse(process.argv[2]);
// const targetTime = Number(process.argv[3]);
// console.log(`exerciseCalculator: ${exerciseCalculator(timeArr, targetTime)}`);
// console.log(JSON.stringify(exerciseCalculator(timeArr, targetTime)));
// npm run calculateExercises [2 1 0 2 4.5 0 3 1 0 4]
