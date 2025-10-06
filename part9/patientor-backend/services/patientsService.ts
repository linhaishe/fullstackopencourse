import { v1 as uuid } from 'uuid';
import allPatients from '../data/patients';
import {
  Entry,
  IPatientsEntry,
  NewEntry,
  NewPatientEntry,
  NonSensitivePatientsEntry,
} from '../types/patients';
import { toGender } from '../utils';

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: toGender(gender),
    occupation,
    entries: [],
  }));
};

const addPatient = (entry: NewPatientEntry): IPatientsEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
    gender: toGender(entry.gender),
    entries: [],
  };

  allPatients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): IPatientsEntry => {
  const entry = allPatients.find((d) => d.id === id);
  if (entry) return entry as IPatientsEntry;
  return {
    id: '',
    name: '',
    dateOfBirth: '',
    gender: 'other',
    occupation: '',
  } as IPatientsEntry;
};

const addEntry = (id: string, obj: NewEntry): Entry => {
  const patient = allPatients.find((d) => d.id === id);
  if (!patient)
    return {
      id: '',
      type: 'HealthCheck',
      description: obj.description,
      date: obj.date,
      specialist: obj.specialist,
      healthCheckRating: 0,
      diagnosisCodes: obj.diagnosisCodes ?? [],
    };

  const newId = uuid();
  let newEntry: Entry;

  switch (obj.type) {
    case 'HealthCheck':
      newEntry = {
        id: newId,
        type: 'HealthCheck',
        description: obj.description,
        date: obj.date,
        specialist: obj.specialist,
        healthCheckRating: obj.healthCheckRating,
        diagnosisCodes: obj.diagnosisCodes ?? [],
      };
      break;

    case 'Hospital':
      newEntry = {
        id: newId,
        type: 'Hospital',
        description: obj.description,
        date: obj.date,
        specialist: obj.specialist,
        discharge: obj.discharge,
        diagnosisCodes: obj.diagnosisCodes ?? [],
      };
      break;

    case 'OccupationalHealthcare':
      newEntry = {
        id: newId,
        type: 'OccupationalHealthcare',
        description: obj.description,
        date: obj.date,
        specialist: obj.specialist,
        employerName: obj.employerName,
        sickLeave: obj.sickLeave ?? { startDate: '', endDate: '' },
        diagnosisCodes: obj.diagnosisCodes ?? [],
      };
      break;
  }

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
};
