import React from 'react'


//显示人名组件
const Persons = ({ persons }) => {
    console.log({ persons })
    return (
    <li>{persons.name} {persons.number}</li>
    )
  }

  export default Persons
