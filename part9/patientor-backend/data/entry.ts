import { Entry } from '../types/patients';

export const entryData: Entry[] = [
  {
    id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
    description:
      "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
    date: '2015-01-02',
    specialist: 'MD House',
    diagnosisCodes: ['S62.5'],
    type: 'Hospital',
    discharge: {
      date: '2015-01-16',
      criteria: 'Thumb has healed.',
    },
  },
  {
    id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
    description:
      'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
    date: '2019-08-05',
    specialist: 'MD House',
    diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
    type: 'OccupationalHealthcare',
    employerName: 'HyPD',
    sickLeave: {
      startDate: '2019-08-05',
      endDate: '2019-08-28',
    },
  },
];
