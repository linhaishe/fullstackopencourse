import { useSelector } from 'react-redux';
import './App.css';
import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';
import AnecdoteFilter from './components/AnecdoteFilter.jsx';
import Notification from './components/Notification.jsx';
import { useState } from 'react';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const [filterText, seFilterText] = useState('');
  const filteredNotes = anecdotes.notes.filter((note) =>
    filterText.trim() === ''
      ? true
      : note.content.toLowerCase().includes(filterText.toLowerCase())
  );

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
