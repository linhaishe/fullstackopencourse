import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, updateNote } from './requests';
import './App.css';

const App = () => {
  const queryClient = useQueryClient();
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false,
    retry: false,
  });
  // console.log(JSON.parse(JSON.stringify(result)).data);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>server break~</div>;
  }

  const notes = result.data;

  const handleVote = (id, votes) => {
    updateNoteMutation.mutate({ id, votes });
  };

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {notes?.map((anecdote, idx) => (
        <div key={anecdote.id}>
          <div>
            {idx}
            {'. '}
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => handleVote(anecdote.id, (anecdote.votes || 0) + 1)}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
