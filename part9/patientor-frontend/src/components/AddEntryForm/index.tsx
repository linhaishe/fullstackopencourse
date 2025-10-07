import {
  Alert,
  Button,
  FormControlLabel,
  InputLabel,
  RadioGroup,
  TextField,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Radio } from '@mui/material';
import patientService from '../../services/patients';
import { EntryFormValues, Patient } from '../../types';
import axios from 'axios';
import { useParams, useOutletContext } from 'react-router-dom';

import './index.css';

enum EntryTypeE {
  'HealthCheck' = 'HealthCheck',
  'Hospital' = 'Hospital',
  'OccupationalHealthcare' = 'OccupationalHealthcare',
}

interface TEntryTypeOption {
  value: EntryTypeE;
  label: string;
}

const typeOptions: TEntryTypeOption[] = Object.values(EntryTypeE).map((v) => ({
  value: v,
  label: v.toString(),
}));

const BasicForm = (props: {
  type: EntryTypeE;
  setType: (arg0: EntryTypeE) => void;
  description: string;
  setDescription: (arg0: string) => void;
  date: string;
  setDate: (arg0: string) => void;
  specialist: string;
  setSpecialist: (arg0: string) => void;
  diagnosisCodes: string;
  setDiagnosisCodes: (arg0: string) => void;
}) => {
  return (
    <div>
      <InputLabel>type</InputLabel>
      <RadioGroup
        row
        value={props.type}
        onChange={({ target }) => props.setType(target.value as EntryTypeE)}
      >
        {typeOptions?.map((v) => (
          <FormControlLabel
            value={v.value}
            control={<Radio />}
            label={v.label}
            key={v.value}
          />
        ))}
      </RadioGroup>

      <TextField
        id='standard-basic'
        label='Description'
        variant='standard'
        value={props.description}
        onChange={({ target }) => props.setDescription(target.value)}
      />
      <br />
      <TextField
        id='standard-basic'
        label='Date'
        variant='standard'
        value={props.date}
        onChange={({ target }) => props.setDate(target.value)}
      />
      <br />
      <TextField
        id='standard-basic'
        label='specialist'
        variant='standard'
        value={props.specialist}
        onChange={({ target }) => props.setSpecialist(target.value)}
      />

      <br />
      <TextField
        id='standard-basic'
        label='Diagnosis Codes'
        variant='standard'
        value={props.diagnosisCodes}
        onChange={({ target }) => props.setDiagnosisCodes(target.value)}
      />
    </div>
  );
};

const HealthCheckForm = (props: {
  healthCheckRating: string;
  setHealthCheckRating: (arg0: string) => void;
}) => {
  return (
    <div>
      <TextField
        id='standard-basic'
        label='healthCheckRating'
        variant='standard'
        value={props.healthCheckRating}
        onChange={({ target }) => props.setHealthCheckRating(target.value)}
      />
    </div>
  );
};

const HospitalForm = (props: {
  discharge: { date: string; criteria: string };
  setDischarge: (arg0: { (prev: any): any; (prev: any): any }) => void;
}) => {
  return (
    <div>
      <br />
      <InputLabel htmlFor='my-input4'>discharge</InputLabel>
      <TextField
        id='standard-basic'
        label='date'
        variant='standard'
        value={props.discharge.date}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.setDischarge((prev: any) => ({
            ...prev,
            date: event.target.value,
          }));
        }}
      />
      <TextField
        id='standard-basic'
        label='criteria'
        variant='standard'
        value={props.discharge.criteria}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.setDischarge((prev: any) => ({
            ...prev,
            criteria: event.target.value,
          }));
        }}
      />
    </div>
  );
};

const OccupationalHealthcareForm = (props: {
  employerName: string;
  setEmployerName: (arg0: string) => void;
  sickLeave: { startDate: string; endDate: string };
  setSickLeave: (arg0: { (prev: any): any; (prev: any): any }) => void;
}) => {
  return (
    <div>
      <TextField
        id='standard-basic'
        label='employerName'
        variant='standard'
        value={props.employerName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.setEmployerName(event.target.value);
        }}
      />
      <InputLabel className={'inputTextLabel'} htmlFor='my-input4'>
        sickLeave
      </InputLabel>
      <TextField
        id='standard-basic'
        label='startDate'
        variant='standard'
        value={props.sickLeave.startDate}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.setSickLeave((prev: any) => ({
            ...prev,
            startDate: event.target.value,
          }));
        }}
      />
      <TextField
        id='standard-basic'
        label='endDate'
        variant='standard'
        value={props.sickLeave.endDate}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.setSickLeave((prev: any) => ({
            ...prev,
            endDate: event.target.value,
          }));
        }}
      />
    </div>
  );
};

type ContextType = {
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
};

export default function Index() {
  const { setPatient } = useOutletContext<ContextType>();
  const { id } = useParams<{ id: string }>();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [discharge, setDischarge] = useState({
    date: '',
    criteria: '',
  });
  const [sickLeave, setSickLeave] = useState({
    startDate: '',
    endDate: '',
  });
  const [employerName, setEmployerName] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState<EntryTypeE>(EntryTypeE.HealthCheck);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const patient = await patientService.createEntry(id as string, values);
      console.log('patient', patient);
      setPatient((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          entries: [...prev.entries, patient],
        };
      });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError(e?.response?.data?.error?.[0]?.message);
          console.log('e', e?.response?.data?.error?.[0]?.message);
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const onEntrySubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    let finalForm;
    const basicEntryDetail = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes?.split(',') || [],
      type,
    };
    if (type === EntryTypeE.HealthCheck) {
      finalForm = {
        ...basicEntryDetail,
        healthCheckRating: Number(healthCheckRating),
      };
    } else if (type === EntryTypeE.Hospital) {
      finalForm = {
        ...basicEntryDetail,
        discharge,
      };
    } else if (type === EntryTypeE.OccupationalHealthcare) {
      finalForm = {
        ...basicEntryDetail,
        employerName,
        sickLeave,
      };
    }

    submitNewEntry(finalForm as EntryFormValues);
    console.log('res', finalForm);
  };

  return (
    <div>
      {error && <Alert severity='error'>{error}</Alert>}
      <form className={'formWrap'} onSubmit={onEntrySubmit}>
        <BasicForm
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          specialist={specialist}
          setSpecialist={setSpecialist}
          diagnosisCodes={diagnosisCodes}
          type={type as EntryTypeE}
          setType={setType}
          setDiagnosisCodes={setDiagnosisCodes}
        />

        {type === EntryTypeE.HealthCheck && (
          <HealthCheckForm
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        )}

        {type === EntryTypeE.Hospital && (
          <HospitalForm discharge={discharge} setDischarge={setDischarge} />
        )}

        {type === EntryTypeE.OccupationalHealthcare && (
          <OccupationalHealthcareForm
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
            employerName={employerName}
            setEmployerName={setEmployerName}
          />
        )}
        <div className={'BtnWrap'}>
          <Button variant='contained' color='error'>
            CANCEL
          </Button>
          <Button variant='contained' color='success' type='submit'>
            ADD
          </Button>
        </div>
      </form>
    </div>
  );
}
