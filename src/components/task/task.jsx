import React from "react";

function Task({ task }) {
  return (
    <div className="task--container">
      <img src={`http://localhost:5000/tasks/${task.photo}`} alt="task" />
      <p>{task.taskTitle}</p>
      <p>{task.taskDescription}</p>
    </div>
  );
}

export default Task;
