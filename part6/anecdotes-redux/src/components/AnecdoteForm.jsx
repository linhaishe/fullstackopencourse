import { useDispatch } from 'react-redux';
import { voteNote } from '../reducers/anecdoteReducer';
import PropTypes from 'prop-types';

export default function AnecdoteForm(props) {
  const dispatch = useDispatch();

  return (
    <div>
      {props?.anecdotes?.map((anecdote) => (
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
    </div>
  );
}

AnecdoteForm.propTypes = {
  anecdotes: PropTypes.array.isRequired,
};
