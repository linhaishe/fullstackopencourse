/* eslint-disable react/prop-types */
const Authors = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props?.allAuthors?.map((a) => (
            <tr key={a?.id}>
              <td>{a?.name}</td>
              <td>{a?.born || 'not know'}</td>
              <td>{a?.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
