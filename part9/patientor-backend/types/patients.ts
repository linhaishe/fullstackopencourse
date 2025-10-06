import z from 'zod';
import { NewEntrySchema } from '../utils';

export interface Entry {}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface IPatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatientsEntry = Omit<IPatientsEntry, 'ssn'>;
export type NewPatientEntry = z.infer<typeof NewEntrySchema>;
