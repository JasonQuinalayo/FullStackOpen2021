const calculateBmi = (heightInCm: number, weightInKg: number) : string => {
  const heightInM = heightInCm / 100;
  const bmi = (weightInKg) / (heightInM * heightInM);
  if (bmi <= 18.4) return 'underweight';
  else if (bmi <= 24.9) return 'normal';
  else if (bmi <= 29.9) return 'overweight';
  return 'obese';
};

interface BmiArguments {
  heightInCm : number;
  weightInKg : number;
}

const parseArgs = (args: Array<string>) : BmiArguments => {
  if (args.length != 4) throw new Error('invalid arguments');
  const heightInCm = Number(args[2]);
  if (isNaN(heightInCm)) throw new Error('invalid arguments');
  const weightInKg = Number(args[3]);
  if (isNaN(weightInKg)) throw new Error('invalid arguments');
  return { heightInCm, weightInKg };
};

if (require.main === module) {
  const args = parseArgs(process.argv);
  console.log(calculateBmi(args.heightInCm, args.weightInKg));
}

export default calculateBmi;
