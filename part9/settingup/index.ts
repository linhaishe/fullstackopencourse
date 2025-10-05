import express from 'express';
import qs from 'qs';
import { bmiCal } from './bmiCalculator.ts';
import { exerciseCalculator } from './exerciseCalculator.ts';
const app = express();
app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const reqObj = {
    height: req.query.height,
    weight: req.query.weight,
    bmi: bmiCal(Number(req.query.height), Number(req.query.weight)),
  };
  res.send(reqObj);
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  const obj = exerciseCalculator(daily_exercises, target);
  res.send(obj);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
