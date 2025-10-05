// import {
//   NonSensitiveDiaryEntry,
//   DiaryEntry,
//   NewDiaryEntry
// } from '../types';

import allPatients from '../data/patients';
import { NonSensitivePatientsEntry } from '../types/patients';

// import diaries from '../../data/entries';

// const getEntries = (): DiaryEntry[] => {
//   return diaries;
// };

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
  return allPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

// const findById = (id: number): DiaryEntry | undefined => {
//   const entry = diaries.find(d => d.id === id);
//   return entry;
// };

// const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {
//   const newDiaryEntry = {
//     id: Math.max(...diaries.map(d => d.id)) + 1,
//     ...entry
//   };

//   diaries.push(newDiaryEntry);
//   return newDiaryEntry;
// };

export default {
  getNonSensitiveEntries,
};
