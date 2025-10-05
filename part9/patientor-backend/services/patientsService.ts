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
  }));
};

const addPatient = (entry: NewPatientEntry): IPatientsEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry,
    gender: toGender(entry.gender),
  };

  allPatients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
};
