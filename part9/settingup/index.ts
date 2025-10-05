import express from 'express';
import qs from 'qs';
import { bmiCal } from './bmiCalculator.ts';
const app = express();

app.get('/hello', (req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log('req.query', req.query.height);
  console.log('req.query', req.query.weight);
  const reqObj = {
    height: req.query.height,
    weight: req.query.weight,
    bmi: bmiCal(Number(req.query.height), Number(req.query.weight)),
  };
  res.send(reqObj);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
