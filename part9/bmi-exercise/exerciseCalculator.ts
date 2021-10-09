interface TestResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseArguments {
  exercises: Array<number>;
  target: number;
}

const caclulateExercise = (exercises : Array<number> , target : number) : TestResults => {
  const periodLength = exercises.length;
  const trainingDays = exercises.reduce((prev, cur) => cur ? prev + 1 : prev, 0);
  const average = exercises.reduce((prev, cur) => prev + cur) / exercises.length;
  const success = average >= target;
  const rating = success ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescriptions = [
    "You didn't even achieve 50% of target!",
    "You achieved at least 50% of target",
    "You achieved your goal!",
  ];
  const ratingDescription = ratingDescriptions[rating - 1];
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseExerciseArgs = (args: Array<string>) : ExerciseArguments => {
  if (args.length < 4) throw new Error('too few arguments');
  const target = Number(args[2]);
  if (isNaN(target)) throw new Error('invalid arguments');
  const exercises = args.slice(3)
    .map(exercise => {
      const num = Number(exercise); 
      if (isNaN(num)) throw new Error('invalid arguments');
      return num;
    });
  return { exercises, target };
};

if (require.main == module) {
  const exerciseArgs = parseExerciseArgs(process.argv);
  console.log(caclulateExercise(exerciseArgs.exercises, exerciseArgs.target));
}

export default caclulateExercise;
