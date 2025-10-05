import z from 'zod';
import { NewEntrySchema } from '../utils';

export enum GenderE {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface IPatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: GenderE;
  occupation: string;
}

export type NonSensitivePatientsEntry = Omit<IPatientsEntry, 'ssn'>;
export type NewPatientEntry = z.infer<typeof NewEntrySchema>;
