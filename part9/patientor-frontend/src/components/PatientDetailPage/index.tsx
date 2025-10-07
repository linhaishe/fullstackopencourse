import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from '../EntryDetails';
import { Outlet } from 'react-router-dom';
import { Button } from '@mui/material';

export const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (id) {
      const fetchPatientList = async () => {
        const patient = await patientService.getPatient(id);
        setPatient(patient);
      };
      void fetchPatientList();
    }
  }, [id]);

  if (!patient) return <div>no person...</div>;

  return (
    <div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <h2>{patient.name}</h2>
        {patient.gender === Gender.Female ? (
          <FemaleIcon />
        ) : patient.gender === Gender.Male ? (
          <MaleIcon />
        ) : null}
      </div>

      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Outlet context={{ setPatient }} />
      {location.pathname.endsWith('/entry') ? null : (
        <Button
          component={Link}
          to={`/patients/${id}/entry`}
          variant='contained'
          color='primary'
        >
          Add Entry
        </Button>
      )}
      {patient?.entries?.map((v, i) => (
        <div key={i}>
          <EntryDetails entry={v} />
        </div>
      ))}
    </div>
  );
};
