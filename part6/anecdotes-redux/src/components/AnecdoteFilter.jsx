import PropTypes from 'prop-types';

export default function AnecdoteFilter(props) {
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter
      <input
        onChange={(e) => {
          e.preventDefault();
          props.seFilterText(e.target.value);
        }}
      />
    </div>
  );
}

AnecdoteFilter.propTypes = {
  seFilterText: PropTypes.any.isRequired,
};
