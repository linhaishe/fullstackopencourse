import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';
import AnecdoteFilter from './components/AnecdoteFilter.jsx';
import Notification from './components/Notification.jsx';
import { initializeNotes } from './reducers/anecdoteSlice.js';
import './App.css';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();
  const [filterText, seFilterText] = useState('');
  const filteredNotes = anecdotes.notes.filter((note) =>
    filterText.trim() === ''
      ? true
      : note.content.toLowerCase().includes(filterText.toLowerCase())
  );

  useEffect(() => {
    dispatch(initializeNotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter seFilterText={seFilterText} />
      <AnecdoteList anecdotes={filteredNotes} />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
