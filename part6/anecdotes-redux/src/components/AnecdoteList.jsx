import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationSlice';
export default function AnecdoteList(props) {
  const dispatch = useDispatch();
  const notify = (message) => {
    dispatch(setNotification(message));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  // debugger;

  return (
    <div>
      {props?.anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch({
                  type: 'notes/voteNote',
                  payload: {
                    id: anecdote.id,
                  },
                });
                notify(`You voted for: "${anecdote.content}"`);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

AnecdoteList.propTypes = {
  anecdotes: PropTypes.array.isRequired,
};
