import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';
import { Patient } from './types';
import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';
import { PatientDetailPage } from './components/PatientDetailPage';
import AddEntryForm from './components/AddEntryForm';

import './index.css';
// 3. trick 4. cancel 5. 增加diagnose的select 6. 增加calender
const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatientList = async () => {
    try {
      const patients = await patientService.getAll();
      setPatients(patients);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPatientList();
  }, []);
  return (
    <div className='App'>
      <Router>
        <Container>
          <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to='/' variant='contained' color='primary'>
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path='/'
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route path='/patients/:id' element={<PatientDetailPage />}>
              <Route path='entry' element={<AddEntryForm />} />
            </Route>
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
