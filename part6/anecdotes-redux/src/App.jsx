import { useSelector } from 'react-redux';
import './App.css';
import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';

const App = () => {
  const anecdotes = useSelector((state) => state);

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={anecdotes} />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
