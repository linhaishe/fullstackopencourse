// import {
//   NonSensitivePatientEntry,
//   PatientEntry,
//   NewPatientEntry
// } from '../types';
import { v1 as uuid } from 'uuid';
import allPatients from '../data/patients';
import {
  IPatientsEntry,
  NewPatientEntry,
  NonSensitivePatientsEntry,
} from '../types/patients';

// import diaries from '../../data/entries';

// const getEntries = (): PatientEntry[] => {
//   return diaries;
// };

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

// const findById = (id: number): PatientEntry | undefined => {
//   const entry = diaries.find(d => d.id === id);
//   return entry;
// };

const addPatient = (entry: NewPatientEntry): IPatientsEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
  };

  allPatients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
};
