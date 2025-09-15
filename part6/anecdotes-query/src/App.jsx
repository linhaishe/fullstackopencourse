import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery } from '@tanstack/react-query';
import './App.css';
import { getNotes } from './requests';

const App = () => {
  const handleVote = (anecdote) => {
    console.log('vote');
  };

  const anecdotes = [
    {
      content: 'If it hurts, do it more often',
      id: '47145',
      votes: 0,
    },
  ];

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });
  console.log(111, JSON.parse(JSON.stringify(result)).data);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const notes = result.data;
  console.log('notes', notes);

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {notes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
