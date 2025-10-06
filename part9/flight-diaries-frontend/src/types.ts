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
  comment?: string;
}

export type DiaryFormValues = Omit<Diary, 'id'>;
