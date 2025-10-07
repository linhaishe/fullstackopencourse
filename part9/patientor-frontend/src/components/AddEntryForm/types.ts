import allDiagnoses from '../../diagnoses';
import { HealthCheckRating } from '../../types';

export enum EntryTypeE {
  'HealthCheck' = 'HealthCheck',
  'Hospital' = 'Hospital',
  'OccupationalHealthcare' = 'OccupationalHealthcare',
}

export interface TEntryTypeOption {
  value: EntryTypeE;
  label: string;
}

export const typeOptions: TEntryTypeOption[] = Object.values(EntryTypeE).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
);

export interface IDiagnosis {
  code: string;
  name: string;
  latin: string;
}

export interface DiagnosisCodesOption {
  value: IDiagnosis['code'];
  label: string;
}

export const diagnosisCodesOptions: DiagnosisCodesOption[] = Object.values(
  allDiagnoses
).map((v) => ({
  value: v.code,
  label: v.name,
}));

export interface HealthCheckRatingOptions {
  value: HealthCheckRating;
  label: string;
}

export const healthCheckRatingOptions: HealthCheckRatingOptions[] =
  Object.values(HealthCheckRating)
    .filter((v) => typeof v === 'number')
    .map((v) => ({
      value: v as HealthCheckRating,
      label: HealthCheckRating[v as HealthCheckRating],
    }));
