export interface IPatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatientsEntry = Omit<IPatientsEntry, 'ssn'>;
