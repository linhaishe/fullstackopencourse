```jsx
const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.payload);
  }

  return state;
};
```

The application seems to be working, but the reducer we have declared is bad. It breaks the basic assumption that reducers must be pure functions.

Pure functions are such, that they do not cause any side effects and they must always return the same response when called with the same parameters.

We added a new note to the state with the method state.push(action.payload) which changes the state of the state-object. This is not allowed. The problem is easily solved by using the concat method, which creates a new array, which contains all the elements of the old array and the new element:

A reducer state must be composed of immutable objects. If there is a change in the state, the old object is not changed, but it is replaced with a new, changed, object. This is exactly what we did with the new reducer: the old array is replaced with the new one.

We'll also add the library deep-freeze, which can be used to ensure that the reducer has been correctly defined as an immutable function.

`useSelector` receives a function as a parameter. The function either searches for or selects data from the Redux store. Here we need all of the notes, so our selector function returns the whole state:

```js
const anecdotes = useSelector((state) => state);
```
