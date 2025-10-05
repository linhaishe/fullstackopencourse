import z from 'zod';
import { NewEntrySchema } from '../utils';

export interface IPatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatientsEntry = Omit<IPatientsEntry, 'ssn'>;
export type NewPatientEntry = z.infer<typeof NewEntrySchema>;
