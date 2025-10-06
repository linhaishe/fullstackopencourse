import { v1 as uuid } from 'uuid';
import allPatients from '../data/patients';
import {
  IPatientsEntry,
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

export default {
  getNonSensitiveEntries,
  addPatient,
  findById,
};
