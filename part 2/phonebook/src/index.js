import React, { useState } from 'react'
import ReactDOM from "react-dom";

//显示人名组件
const Person = ({ persons }) => {
  console.log({ persons })
  return (
  <li>{persons.name} {persons.number}</li>

  )
}

const App = () => {
  //这个状态用props传进来的初始人名数组作为状态初始化，保存到notes中。
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }  
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const addName = (event) => {
    const personsCopy = {...persons}
    console.log('personsCopy',{personsCopy})
    console.log('newName',newName)
    console.log('personsCopy0.name',personsCopy[0].name)
    console.log('addnameconsole',{persons})
    // alert('提交的名字: ' + newName);    
    event.preventDefault()    
    console.log('button clicked', event.target) 
    //设定一个对象格式，确定数据的保存格式为一个对象
    const nameObject = {
      name: newName,
      number:newNumber
    }

    
    console.log('addnameObject',nameObject)
    console.log('nameObject.name',nameObject.name)
//如果为空值则提醒
    if(String(nameObject.name).replace(/(^\s*)|(\s*$)/g, "").length===0||String(nameObject.number).replace(/(^\s*)|(\s*$)/g, "").length===0){
      console.log('nameObject.name',nameObject.name)
      alert('empty string,plz reconfirm')
      //未存在则添加
    }else if(JSON.stringify(personsCopy).indexOf(JSON.stringify(newName))===-1){
         //添加新便笺到便笺列表中，concat方式数组添加
         setPersons(persons.concat(nameObject))
         //重置受控input元素的值
         setNewName('')
         setNewNumber('')
    }else{
      //存在则提醒
      alert(`${newName} is already added to phonebook`)
    }

    
    
    //question : 不去除前后无效空字符串，否则也会被添加
    //question: 不能只根据人名进行判断是否存在，必须人名和电话相同才能判断？


    	// //添加新便笺到便笺列表中，concat方式数组添加
      // setPersons(persons.concat(nameObject))
      // //重置受控input元素的值
      // setNewName('')
  }


  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)  
  }

  const handleNumberChange=(event)=>{
    console.log(event.target.value)    
    setNewNumber(event.target.value)  

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>

        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>
        {/* 数的顺序会影响显示，person,name不等于name,person */}
        {persons.map((persons,i) => 
          <Person key={i} persons={persons} />
        )}
      </p>
    </div>
  )
}
export default App

ReactDOM.render(<App />, document.getElementById("root"));