import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../requests';
import { useNotification } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newNoteMutation = useMutation({
    mutationFn: createNote,
    // This in turn causes React Query to automatically update a query with the key notes, i.e. fetch the notes from the server.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
  const { showNotification } = useNotification();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    console.log('new anecdote');
    newNoteMutation.mutate({
      content,
    });
    showNotification(`you add ${event.target.anecdote.value}`);
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
