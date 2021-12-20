import React, { useState } from "react";

function Task({ data, index, handleDeleteTask, handleEditTask }) {
  const [toggleEditForm, setToggleEditForm] = useState(false);
  const [editedTaskInput, setEditedTaskInput] = useState("");
  return (
    <div className="oneTaskContainer">
      <p>{data}</p>
      <div className="buttonsAreaWithEdit">
        <div className="buttonsArea">
          <button onClick={() => setToggleEditForm(!toggleEditForm)}>🖊️</button>
          <button onClick={() => handleDeleteTask(index)}>❌</button>
        </div>
        {toggleEditForm && (
          <div className="editPanel">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditTask(index, editedTaskInput);
                setToggleEditForm(!toggleEditForm);
              }}
            >
              <input
                type="text"
                onChange={(e) => setEditedTaskInput(e.target.value)}
                required
              />
              <button>Edit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;
