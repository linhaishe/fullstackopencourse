import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotes, updateNote } from './requests';
import { useNotification } from './NotificationContext';

import './App.css';

const App = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (err) => {
      showNotification(err?.response?.data?.error || err.code);
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

  const handleVote = (item) => {
    updateNoteMutation.mutate({
      id: item.id,
      votes: (item.votes || 0) + 1,
    });
    showNotification(item.content);
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
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
