import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Diary } from './types';

import patientService from './services/diaries';
import DiaryListPage from './components/DiaryListPage';
import './index.css';
const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const diaries = await patientService.getAll();
      setDiaries(diaries);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Container>
          <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
            Ilari's flight diaries
          </Typography>
          <Button component={Link} to='/' variant='contained' color='primary'>
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path='/'
              element={
                <DiaryListPage diaries={diaries} setDiaries={setDiaries} />
              }
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
