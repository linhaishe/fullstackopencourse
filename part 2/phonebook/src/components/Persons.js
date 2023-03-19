import React from "react";

//显示人名组件
const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      <li>
        {persons.name} {persons.number}
        <button onClick={handleDelete}> delete</button>
      </li>
    </>
  );
};

export default Persons;
