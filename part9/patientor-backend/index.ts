import express from 'express';
import cors from 'cors';
import patientsRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

app.use('/api/patients', patientsRouter);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
