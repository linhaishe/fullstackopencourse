import React, { useState } from 'react'
import ReactDOM from "react-dom";

//显示人名组件
const Name = ({ persons }) => {
  console.log({ persons })
  return (
    <li>{persons.name}</li>
  )
}

const App = () => {
  //这个状态用props传进来的初始人名数组作为状态初始化，保存到notes中。
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace'}
  ]) 
  const [ newName, setNewName ] = useState('')

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
      name: newName
    }
    console.log('addnameObject',nameObject)
    console.log('nameObject.name',nameObject.name)

    if(String(nameObject.name).replace(/(^\s*)|(\s*$)/g, "").length===0){
      console.log('nameObject.name',nameObject.name)
      alert('empty string,plz reconfirm')
    }else if(JSON.stringify(personsCopy).indexOf(JSON.stringify(nameObject))===-1){
         //添加新便笺到便笺列表中，concat方式数组添加
         setPersons(persons.concat(nameObject))
         //重置受控input元素的值
         setNewName('')
    }else{
      alert(`${newName} is already added to phonebook`)
    }
    
    //question : 去除前后无效空字符串，否则也会被添加

    	// //添加新便笺到便笺列表中，concat方式数组添加
      // setPersons(persons.concat(nameObject))
      // //重置受控input元素的值
      // setNewName('')
  }

  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)  
  }

  // const myFunction = function myFunction(){
  //   alert("你好，我是一个警告框！");
  // }

  // const alert=()=>{
  //   alert("你好，我是一个警告框！");
  // }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>
        {/* 数的顺序会影响显示，person,name不等于name,person */}
        {persons.map((persons,name) => 
          <Name key={name} persons={persons} />
        )}
      </p>
    </div>
  )
}
export default App

ReactDOM.render(<App />, document.getElementById("root"));