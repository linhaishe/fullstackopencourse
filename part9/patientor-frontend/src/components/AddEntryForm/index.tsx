import {
  Alert,
  Button,
  FormControlLabel,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Radio } from '@mui/material';
import patientService from '../../services/patients';
import { EntryFormValues, HealthCheckRating, Patient } from '../../types';
import axios from 'axios';
import { useParams, useOutletContext } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {
  diagnosisCodesOptions,
  EntryTypeE,
  healthCheckRatingOptions,
  typeOptions,
} from './types';
import './index.css';

const BasicForm = (props: {
  type: EntryTypeE;
  setType: (arg0: EntryTypeE) => void;
  description: string;
  setDescription: (arg0: string) => void;
  date: string;
  setDate: (arg0: string) => void;
  specialist: string;
  setSpecialist: (arg0: string) => void;
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
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
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Date'
            value={props.date ? dayjs(props.date) : null}
            onChange={(newValue) => {
              if (newValue) props.setDate(dayjs(newValue).format('YYYY-MM-DD'));
            }}
          />
        </LocalizationProvider>
      </div>
      <TextField
        id='standard-basic'
        label='specialist'
        variant='standard'
        value={props.specialist}
        onChange={({ target }) => props.setSpecialist(target.value)}
      />

      <br />
      <InputLabel className={'inputTextLabel'} htmlFor='my-input4'>
        diagnosis
      </InputLabel>
      <Select
        label='diagnosisCodes'
        fullWidth
        multiple
        value={props.diagnosisCodes}
        onChange={({ target }) =>
          props.setDiagnosisCodes(target.value as string[])
        }
      >
        {diagnosisCodesOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

const HealthCheckForm = (props: {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      <InputLabel className={'inputTextLabel'} htmlFor='my-input4'>
        healthCheckRating
      </InputLabel>
      <Select
        label='diagnosisCodes'
        fullWidth
        value={props.healthCheckRating}
        onChange={({ target }) =>
          props.setHealthCheckRating(target.value as number)
        }
      >
        {healthCheckRatingOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
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
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='Date'
            value={props.discharge.date ? dayjs(props.discharge.date) : null}
            onChange={(newValue) => {
              if (newValue) {
                props.setDischarge((prev: any) => ({
                  ...prev,
                  date: dayjs(newValue).format('YYYY-MM-DD'),
                }));
              }
            }}
          />
        </LocalizationProvider>
      </div>
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
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='startDate'
            value={
              props.sickLeave.startDate
                ? dayjs(props.sickLeave.startDate)
                : null
            }
            onChange={(newValue) => {
              if (newValue) {
                props.setSickLeave((prev: any) => ({
                  ...prev,
                  startDate: dayjs(newValue).format('YYYY-MM-DD'),
                }));
              }
            }}
          />
        </LocalizationProvider>
      </div>
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label='endDate'
            value={
              props.sickLeave.endDate ? dayjs(props.sickLeave.endDate) : null
            }
            onChange={(newValue) => {
              if (newValue) {
                props.setSickLeave((prev: any) => ({
                  ...prev,
                  endDate: dayjs(newValue).format('YYYY-MM-DD'),
                }));
              }
            }}
          />
        </LocalizationProvider>
      </div>
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
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(0);
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
      diagnosisCodes,
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
