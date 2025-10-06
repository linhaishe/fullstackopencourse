import { Entry } from '../../types';
import HealthCheckEntry from '../HealthCheckEntry';
import HospitalEntry from '../HospitalEntry';
import OccupationalHealthcare from '../OccupationalHealthcare';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default function Index({ entry }: { entry: Entry }) {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;

    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;

    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;

    default:
      return assertNever(entry);
  }
}
