import { Entry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';
import InterestsIcon from '@mui/icons-material/Interests';

export default function Index(props: { entry: Entry }) {
  return (
    <div
      style={{
        border: '1px solid black',
        marginTop: '20px',
        padding: '10px',
        borderRadius: '10px',
      }}
    >
      <span>{props.entry.date}</span>
      <WorkIcon />
      <p>{props.entry.description}</p>
      <ul>
        {props.entry?.diagnosisCodes?.map((v, i) => {
          return <li>{v}</li>;
        })}
      </ul>
      <InterestsIcon />
      <p>diagnose by {props.entry.specialist}</p>
    </div>
  );
}
