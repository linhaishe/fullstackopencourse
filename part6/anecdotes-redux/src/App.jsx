import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { useState } from 'react';
import { createNote, voteNote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const [note, setNote] = useState('');

  const addNote = () => {
    dispatch(createNote(note));
  };
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteNote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <div>
        <input
          value={note}
          onChange={(e) => {
            e.preventDefault();
            setNote(e.target.value);
          }}
        />
      </div>
      <button onClick={addNote}>create</button>
    </div>
  );
};

export default App;
