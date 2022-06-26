import React from "react";
import "./task.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../features/task/taskSlice";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
function Task({ task }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    toast.error("💥This task has been deleted!");
  };
  return (
    <Link className="task__link" to={`/tasks/${task._id}`}>
      <div className="task--container">
        <div className="task__img">
          <img src={`http://localhost:5000/tasks/${task.photo}`} alt="task" />
        </div>
        <div className="task__desc">
          <MdOutlineCancel onClick={handleDelete} title="Delete this task ⚠️" />
          <p>{`${new Date(task.createdAt).toLocaleString("en-US")}`}</p>
          <p>{task.taskTitle}</p>
          <p>{task.taskDescription}</p>
        </div>
      </div>
    </Link>
  );
}

export default Task;
