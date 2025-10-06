import z from 'zod';
import {
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  NewPatientEntrySchema,
  OccupationalHealthcareEntrySchema,
} from '../utils';

enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

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

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis['code'][];
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends keyof any> = T extends unknown ? Omit<T, K> : never;

export type NonSensitivePatientsEntry = UnionOmit<IPatientsEntry, 'ssn'>;
export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export const NewEntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema,
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
]);
export type NewEntry = z.infer<typeof NewEntrySchema>;
export type NewImportEntry = Omit<Entry, 'id'>;
