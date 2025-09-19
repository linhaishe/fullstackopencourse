这个 app 是使用 react redux 实现的

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

Install _json-server_ as a development dependency (only used during development) by executing the command:

```js
npm install json-server --save-dev

"scripts": {
  "server": "json-server -p3001 --watch db.json",
  // ...
}
```

With Redux Thunk it is possible to implement _action creators_ which return a function instead of an object. The function receives Redux store's _dispatch_ and _getState_ methods as parameters.

### Managing data on the server with the React Query library

We shall now use the [React Query](https://tanstack.com/query/latest) library to store and manage data retrieved from the server. The latest version of the library is also called TanStack Query, but we stick to the familiar name.

Install the library with the command

```bash
npm install @tanstack/react-query
```

React Query is a versatile library that, based on what we have already seen, simplifies the application. Does React Query make more complex state management solutions such as Redux unnecessary? No. React Query can partially replace the state of the application in some cases, but as the [documentation](https://tanstack.com/query/latest/docs/react/guides/does-this-replace-client-state) states

- React Query is a _server-state library_, responsible for managing asynchronous operations between your server and client
- Redux, etc. are _client-state libraries_ that can be used to store asynchronous data, albeit inefficiently when compared to a tool like React Query

So React Query is a library that maintains the _server state_ in the frontend, i.e. acts as a cache for what is stored on the server. React Query simplifies the processing of data on the server, and can in some cases eliminate the need for data on the server to be saved in the frontend state.

Most React applications need not only a way to temporarily store the served data, but also some solution for how the rest of the frontend state (e.g. the state of forms or notifications) is handled.
