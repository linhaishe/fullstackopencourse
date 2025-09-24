/* eslint-disable react/prop-types */
import { ALL_AUTHORS } from '../queries';
import { useQuery } from '@apollo/client';

const Authors = (props) => {
  const allAuthors = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (!allAuthors) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {(allAuthors || [])?.data?.allAuthors?.map((a) => (
            <tr key={a?.id}>
              <td>{a?.name}</td>
              <td>{a?.born || 'not know'}</td>
              <td>{a?.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
