import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

// import axios from "axios";
import personService from "./services/persons";

import Persons from "./components/Persons";
import PersonsForm from "./components/PersonsForm";
import Filter from "./components/Filter";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";

// axios.get("http://localhost:3001/api/persons").then((response) => {
//   const persons = response.data;
//   console.log("axios", persons);
// });

const App = () => {
  //这个状态用props传进来的初始人名数组作为状态初始化，保存到notes中。
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilterword, setNewFilterword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    // axios.get("http://localhost:3001/persons")
    personService.getAll().then((response) => {
      console.log("getAll()response", response);
      console.log("promise fulfilled");
      setPersons(response.data);
      console.log("getAll()response.data", response.data);
    });
  }, []);
  // console.log("render", persons.length, "notes");

  const addName = (event) => {
    const personsCopy = { ...persons };

    console.log("personsCopy", personsCopy);
    console.log("newName", newName);
    console.log("personsCopy0.name", personsCopy[0].name);
    console.log("personspersons", persons);
    // alert('提交的名字: ' + newName);
    event.preventDefault();
    console.log("button clicked", event.target);

    //设定一个对象格式，确定数据的保存格式为一个对象
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    console.log("addnameObject", nameObject);
    console.log("nameObject.name", nameObject.name);

    //如果为空值则提醒
    if (
      String(nameObject.name).replace(/(^\s*)|(\s*$)/g, "").length === 0 ||
      String(nameObject.number).replace(/(^\s*)|(\s*$)/g, "").length === 0
    ) {
      console.log("nameObject.name", nameObject.name);
      alert("empty string,plz reconfirm");
      //未存在则添加
    } else if (
      JSON.stringify(personsCopy).indexOf(JSON.stringify(newName)) === -1
    ) {
      //添加新便笺到便笺列表中，concat方式数组添加
      // setPersons(persons.concat(nameObject));
      //重置受控input元素的值
      // setNewName("");
      // setNewNumber("");

      personService
        .create(nameObject)
        // .post("http://localhost:3001/persons", nameObject)
        .then((response) => {
          setSuccessMessage(`Note '${newName}' was add successfully`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        });
    } else {
      //存在则提醒,并询问是否替换内容
      const duplicateCheck = persons.find((person) => person.name === newName);
      //名字相同，电话不同,则询问是否替换
      if (
        typeof duplicateCheck !== "undefined" &&
        duplicateCheck.number !== newNumber
      ) {
        personService
          .update(duplicateCheck.id, {
            name: duplicateCheck.name,
            number: newNumber,
          })
          .then((returnedPerson) => {
            if (
              window.confirm(
                `${returnedPerson.name} is already added to phonebook,replace the old number with a new one?`
              )
            ) {
              setPersons(
                persons.map((person) =>
                  person.id !== duplicateCheck.id ? person : returnedPerson
                )
              );
            }
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.log("fail");
            setErrorMessage(
              `Information of '${newName}' has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
        //为什么要加return?
        // return;
      } else if (typeof duplicateCheck !== "undefined") {
        //名字电话相同则提醒已存在
        alert(`${newName} is already added to phonebook`);
        setNewName("");
        setNewNumber("");
        // return;
      }
    }

    //question : 不去除前后无效空字符串，否则也会被添加
    //question:需刷新后替换的新数据才会显示，如何优化？
  };

  function filterByValue(values, str) {
    return values
      .map(function (value) {
        return String(value).toLowerCase();
      })
      .find(function (value) {
        return value.includes(str.toString().toLowerCase());
      });
  }

  const filterResult = persons.filter(function (item) {
    return filterByValue(Object.values(item), newFilterword);
  });

  console.log("result2222", filterResult);
  console.log("persons2222", persons);
  console.log("newFilterword2222", newFilterword);

  const handleDelete = (idProp) => {
    console.log(idProp);
    console.log("handleDelete", persons);
    const personToBeRemoved = persons.find(person => person.id === idProp)
    const id = personToBeRemoved.id
    const name = personToBeRemoved.name
    if (
      window.confirm(`Do you really want to delete ${name}?`)
    ) {
      personService
        .deleteperson(id)
        .then((response) => {
          //为什么这里console出来空数组？
          console.log("deletedeletedelete", response.data);
          setPersons(persons.filter((n) => n.id !== id));
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(
            `Information of '${name}' has already been removed from the server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterwordChange = (event) => {
    setNewFilterword(event.target.value);
  };

  //根据输入的自字符进行筛选
  // const filterByValue = function filterByValue(arr, word) {
  //   return arr.filter((o) =>
  //     Object.keys(o).some((k) =>
  //       o[k].toLowerCase().includes(word.toLowerCase())
  //     )
  //   );
  // };
  //TypeError: o[k].toLowerCase is not a function

  //input数据转化为字符串便于筛选function 运行
  // const inputValue = newFilterword.toString();
  // console.log("typeof inputValue", typeof inputValue);

  //得到筛选结果
  // const result = filterByValue(persons, inputValue);
  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <h2>Phonebook</h2>
      filter shown with{" "}
      <input value={newFilterword} onChange={handleFilterwordChange} />
      <p>
        {filterResult.map((filterResult, i) => (
          <Filter key={i} filterResult={filterResult} />
        ))}
      </p>
      <h1>add a new</h1>
      <PersonsForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <p>
        {/* 数的顺序会影响显示，person,name不等于name,person */}
        {persons.map((persons, i) => (
          <Persons
            key={i}
            persons={persons}
            handleDelete={() => handleDelete(persons.id)}
          />
        ))}
      </p>
    </div>
  );
};
export default App;

ReactDOM.render(<App />, document.getElementById("root"));
