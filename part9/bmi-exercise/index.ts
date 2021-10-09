/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import calculateBmi from './bmiCalculator';
import caclulateExercise from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.send({error: 'malformatted parameters'});
    return;
  }
  const bmi = calculateBmi(height, weight);
  res.send({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  if (!req.body.exercises || !req.body.target) {
    res.send({error: 'parameters missing'});
  } else if (!Array.isArray(req.body.exercises) || isNaN(Number(req.body.target))) {
    res.send({error: 'malformatted parameters'});
  } else {
    res.send(caclulateExercise(req.body.exercises, req.body.target));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
