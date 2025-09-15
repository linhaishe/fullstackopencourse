/* eslint-disable no-undef */
import { counterReducer, initialState, actionType } from './anecdoteSlice.js';
import deepFreeze from 'deep-freeze';

describe('counterReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = initialState;
    const action = {
      type: actionType.VOTE,
      payload: {
        id: initialState?.[0]?.id,
      },
    };

    deepFreeze(state);
    const newState = counterReducer(state, action);
    const newStateIdVote = newState?.find(
      (item) => item.id === initialState?.[0]?.id
    )?.votes;
    console.log('newStateIdVote', initialState[0].votes);

    const expectNum = (initialState[0].votes || 0) + 1;
    expect(newStateIdVote).toBe(expectNum);
  });
});
