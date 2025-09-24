/* eslint-disable react/prop-types */
import { ALL_AUTHORS } from '../queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_AUTHOR } from '../queries';

const Authors = (props) => {
  const allAuthors = useQuery(ALL_AUTHORS);
  const [authorName, setAuthorName] = useState('');
  const [birth, setBirth] = useState('');
  const [editAuthor, result] = useMutation(EDIT_AUTHOR);
  console.log('result', result);

  if (!props.show) {
    return null;
  }

  if (!allAuthors) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name: authorName, setBornTo: birth } });
    setAuthorName('');
    setBirth('');
  };
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
      <form onSubmit={submit}>
        authorName
        <input
          type='text'
          value={authorName}
          onChange={({ target }) => setAuthorName(target.value)}
        />
        <br />
        birth
        <input
          type='number'
          value={birth}
          onChange={({ target }) => setBirth(Number(target.value))}
        />
        <button type='submit'>set born</button>
      </form>
    </div>
  );
};

export default Authors;
