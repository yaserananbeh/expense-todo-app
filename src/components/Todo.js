import React, { useState, useEffect } from "react";
import Task from "./Task";
import "../style/Todo.css";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      let prevTasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks([...prevTasks]);
    } else {
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }, []);
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, taskInput]);
    localStorage.setItem("tasks", JSON.stringify([...tasks, taskInput]));
    setTaskInput("");
  };
  const handleDeleteTask = (index) => {
    let newArr = [...tasks];
    newArr.splice(index, 1);
    setTasks(newArr);
    localStorage.setItem("tasks", JSON.stringify(newArr));
  };
  const handleEditTask = (index, editedTask = "editedTask") => {
    let newArr = [...tasks];
    newArr.splice(index, 1, editedTask);
    setTasks(newArr);
    localStorage.setItem("tasks", JSON.stringify(newArr));
  };
  return (
    <div className="todoComponentContainer">
      <div className="formContainer">
        <h2>TodoInput</h2>
        <form
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          <input
            type="text"
            name="newTaskInput"
            id="newTaskInput"
            value={taskInput}
            onChange={(e) => {
              handleInputChange(e);
            }}
            placeholder="new todo"
            required
          />
          <button>Add new task</button>
        </form>
      </div>
      <div className="todoListContainer">
        <h2>TodoList</h2>
        <ul>
          {tasks.length ? (
            tasks.map((data, index) => {
              return (
                <Task
                  key={index}
                  data={data}
                  index={index}
                  handleDeleteTask={handleDeleteTask}
                  handleEditTask={handleEditTask}
                />
              );
            })
          ) : (
            <p>you don't have any task to do</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
