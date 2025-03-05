import React, { useEffect, useState } from "react";
import "./App.css";
import { Modal } from "antd";

function App() {
  function handleClick() {
    if (localStorage.theme === "dark" || !("theme" in localStorage)) {
      //add class=dark in html element
      document.documentElement.classList.add("dark");
    } else {
      //remove class=dark in html element
      document.documentElement.classList.remove("dark");
    }

    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.theme = "dark";
    }
  }
  useEffect(()=>{
   handleClick()
  }, [])
  const users = [
    { id: 1, name: "John", surname: "Doe", age: 19, status: false },
    { id: 2, name: "Alice", surname: "Smith", age: 22, status: true },
    { id: 3, name: "Bob", surname: "Johnson", age: 25, status: false },
    { id: 4, name: "Charlie", surname: "Brown", age: 28, status: true },
    { id: 5, name: "David", surname: "Wilson", age: 30, status: false },
    { id: 6, name: "Emma", surname: "Davis", age: 27, status: true },
    { id: 7, name: "Frank", surname: "Miller", age: 24, status: false },
    { id: 8, name: "Grace", surname: "Moore", age: 21, status: true },
    { id: 9, name: "Henry", surname: "Taylor", age: 23, status: false },
    { id: 10, name: "Ivy", surname: "Anderson", age: 26, status: true },
    { id: 11, name: "Jack", surname: "Thomas", age: 29, status: false },
  ]
  
const [isModalOpen, setIsModalOpen] = useState(false);
const [taskName,setTaskName]= useState('')
const [taskSurname,setTaskSurname]= useState('')
const [taskAge,setAge]= useState('')
const [data,setData]=useState(users)
const [isModalEditOpen, setEditOpen] = useState(false);
const [taskEditName,setTaskEditName]= useState('')
const [taskEditSurname,setTaskEditSurname]= useState('')
const [taskEditAge,setEditAge]= useState('')
const [idx,setIdx]= useState('')
const [taskStatus,setStatus]=useState('')
  const addUser = () => {
    const newUser={
      id: Date.now(),
      name: taskName,
      surname: taskSurname,
      age:taskAge,
      status: taskStatus == "true" ? true : false 
    }
    setData([...data, newUser])
    setIsModalOpen(false)
  };

  const deleteUser=(id)=>{
    setData(data.filter((el)=> el.id != id))
  }

  const editUser=(user)=>{
    setEditOpen(true)
    setTaskEditName(user.name)
    setTaskEditSurname(user.surname)
    setEditAge(user.age)
    setIdx(user.id)
    setStatus(user.status)
  }

  const put=()=>{
    const newUser={
      name:taskEditName,
      surname:taskEditSurname,
      age: taskEditAge,
      status:  taskStatus == "true" ? true : false ,
    }
    setData(data.map(user => (user.id === idx ? newUser : user)));
    setEditOpen(false)
  }

  function checkboxx(e) {
    let checkk = data.map((el) =>
      el.id === e.id ? { ...el, status: !el.status } : el
    );
    setData(checkk);
  }

  return React.createElement(
    "div",
    {className: 'boxes'},
    React.createElement("button", { className: "btns", onClick: ()=>setIsModalOpen(true) }, "add user"),
    React.createElement("button", { className: "btns", onClick: handleClick }, "Dark"),
    React.createElement(
      "div",
      { className: "osnova" },
      React.createElement(
        Modal,
        { title: "Add Modal",  open: isModalOpen, onOk: addUser, onCancel: () => setIsModalOpen(false) },
        React.createElement('div', {className: 'ok'}, 
           React.createElement("input", { type: "text", placeholder: "Name", className:'input', value: taskName, onChange: (e)=> setTaskName(e.target.value)  }) ,
          React.createElement("input", { type: "text", placeholder: "Surname", className:'input', value: taskSurname, onChange: (e)=> setTaskSurname(e.target.value)  }), 
          React.createElement("input", { type: "number", placeholder: "Age", className:'input', value: taskAge, onChange: (e)=> setAge(e.target.value)  }), 
          React.createElement("select", {   className:'input', value: taskStatus, onChange: (e)=> setStatus(e.target.value) }, 
        React.createElement('option', {value: 'true'}, 'Done' ), 
        React.createElement('option', {value: 'false'}, 'Not Done' )
      ) ,
        ),
        ),
        React.createElement(
          Modal,
          { title: "Add Modal",  open: isModalEditOpen, onOk: put, onCancel: () => setEditOpen(false) },
          React.createElement('div', {className: 'ok'}, 
             React.createElement("input", { type: "text", placeholder: "Name", className:'input', value: taskEditName, onChange: (e)=> setTaskEditName(e.target.value)  }) ,
            React.createElement("input", { type: "text", placeholder: "Surname", className:'input', value: taskEditSurname, onChange: (e)=> setTaskEditSurname(e.target.value)  }), 
            React.createElement("input", { type: "number", placeholder: "Age", className:'input', value: taskEditAge, onChange: (e)=> setEditAge(e.target.value)  }) ,
            React.createElement("select", {   className:'input', value: taskStatus, onChange: (e)=> setStatus(e.target.value) }, 
        React.createElement('option', {value: 'true'}, 'Done' ), 
        React.createElement('option', {value: 'false'}, 'Not Done' )
      ) ,
          ),
          ),
      data.map((user) =>
        React.createElement(
          "div",
          { key: user.id, className: "box" },
          React.createElement("p", null, `Name : ${user.name}`),
          React.createElement("p", null, `Surname : ${user.surname}`),
          React.createElement("p", null, `Age : ${user.age}`),
          React.createElement('div', {className: 'check'}, 
            React.createElement("input", { type: "checkbox", checked: user.status ,onChange: ()=>checkboxx(user)}) ,
            React.createElement("p", { style: { color: user.status ? "green" : "red" } }, `${user.status ? "Done" : "Not Done"}`),
          ),
          React.createElement("button", { className: "btn", onClick: ()=> deleteUser(user.id) }, "delete"),
          React.createElement("button", { className: "btn", onClick: ()=> editUser(user) }, "Edit")
        )
      )
    )
  );
}

export default App;
