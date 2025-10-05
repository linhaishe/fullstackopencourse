import { z } from 'zod';

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
