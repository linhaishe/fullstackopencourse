import { z } from 'zod';
import { Gender } from './types/patients';

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.string(),
  occupation: z.string(),
  ssn: z.string(),
});

// export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   return NewEntrySchema.parse(object);
// };

export const toGender = (str: string): Gender => {
  switch (str) {
    case 'male':
      return Gender.Male;
    case 'female':
      return Gender.Female;
    case 'other':
      return Gender.Other;
    default:
      throw new Error(`Invalid gender: ${str}`);
  }
};
