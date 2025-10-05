import express from 'express';
import cors from 'cors';
import allPatients from './data/patients';

const app = express();
app.use(express.json());

app.use(cors());

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

app.get('/api/patients', (req, res) => {
  res.send(allPatients);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
