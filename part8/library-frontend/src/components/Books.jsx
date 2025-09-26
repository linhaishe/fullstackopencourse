/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ALL_BOOKS, ALL_GENRES } from '../queries';
import { useQuery } from '@apollo/client';

const Books = (props) => {
  const [searchGenres, setSearchGenres] = useState(null);
  const { data: allBooks, refetch } = useQuery(ALL_BOOKS);
  const { data: allGenres } = useQuery(ALL_GENRES);

  if (!props.show) {
    return null;
  }

  const books = allBooks?.allBooks;
  const genresList = allGenres?.allGenres;
  const onFilter = (genre) => {
    refetch({ genre });
  };

  return (
    <div>
      <h2>books</h2>
      <p>
        {'in Genre: '}
        <span
          style={{
            fontWeight: '900',
          }}
        >
          {searchGenres || ' '}
        </span>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a?.title}>
              <td>{a?.title}</td>
              <td>{a?.author?.name}</td>
              <td>{a?.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genresList?.map((v, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setSearchGenres(v);
              onFilter(v);
            }}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
};

export default Books;
