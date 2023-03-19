import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import personService from "./services/persons";
import Persons from "./components/Persons";
import PersonsForm from "./components/PersonsForm";
import Filter from "./components/Filter";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";

// axios.get("http://localhost:3001/persons").then((response) => {
//   const persons = response.data;
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
    // axios.get("http://localhost:3001/persons")
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addName = (event) => {
    const personsCopy = { ...persons };
    event.preventDefault();

    //设定一个对象格式，确定数据的保存格式为一个对象
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    //如果为空值则提醒
    if (
      String(nameObject.name).replace(/(^\s*)|(\s*$)/g, "").length === 0 ||
      String(nameObject.number).replace(/(^\s*)|(\s*$)/g, "").length === 0
    ) {
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
              const updatePerson = persons.map((person) =>
                person.id !== duplicateCheck.id ? person : returnedPerson.data
              );
              setPersons(updatePerson);
              setNewName("");
              setNewNumber("");
            }
          })
          .catch(() => {
            setErrorMessage(
              `Information of '${newName}' has already been removed from the server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
        return;
      } else if (typeof duplicateCheck !== "undefined") {
        //名字电话相同则提醒已存在
        alert(`${newName} is already added to phonebook`);
        setNewName("");
        setNewNumber("");
        return;
      }
    }

    //question: 不去除前后无效空字符串，否则也会被添加，使用trim处理
    //question: 需刷新后替换的新数据才会显示，如何优化？已处理，因为没有拿到值，导致显示为空
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

  const handleDelete = (id) => {
    if (
      window.confirm(`Do you really want to delete ${persons[id - 1].name}?`)
    ) {
      personService
        .deletePerson(id)
        .then((response) => {
          //为什么这里console出来空对象？因为server没有返回任何数据，所以response.data是空对象，但response是有值的
          // console.log("deletedeletedelete", response.data);
          setPersons(persons.filter((n) => n.id !== id));
        })
        .catch(() => {
          setErrorMessage(
            `Information of '${
              persons[id - 1].name
            }' has already been removed from the server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value.trim());
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value.trim());
  };

  const handleFilterwordChange = (event) => {
    setNewFilterword(event.target.value);
  };

  // //根据输入的自字符进行筛选
  // const filterByValue = function filterByValue(arr, word) {
  //   return arr.filter((o) =>
  //     Object.keys(o).some((k) =>
  //       o[k].toLowerCase().includes(word.toLowerCase())
  //     )
  //   );
  // };
  // //TypeError: o[k].toLowerCase is not a function

  // //input数据转化为字符串便于筛选function 运行
  // const inputValue = newFilterword.toString();
  // console.log("typeof inputValue", typeof inputValue);

  // // 得到筛选结果
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
