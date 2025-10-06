export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export type PatientFormValues = Omit<Diary, 'id' | 'entries'>;
