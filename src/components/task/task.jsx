import React from "react";
import "./task.scss";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../features/task/taskSlice";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
function Task({ task }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    toast.dark("🗑️ This task has been  deleted! 🚮");
  };
  const navigate = useNavigate();
  return (
    <div className="task--container-main">
      <MdOutlineCancel onClick={handleDelete} title="Delete this task 🗑️" />

      <div
        title="Click 👆"
        onClick={() => navigate(`/tasks/${task._id}`)}
        className="task--container"
      >
        <div className="task__img">
          <img src={`http://localhost:5000/tasks/${task.photo}`} alt="task" />
        </div>

        <div className="task__desc">
          <p>{`${new Date(task.createdAt).toLocaleString("en-US")}`}</p>
          <p>{task.taskTitle}</p>
          <p>{task.taskDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default Task;
