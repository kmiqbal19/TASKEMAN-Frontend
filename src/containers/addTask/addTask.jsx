import React, { useState } from "react";
import "./addTask.scss";
import { BiImageAdd } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { createTask } from "../../features/task/taskSlice";
function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("photo", file);
    dispatch(createTask(data));
  };
  return (
    <div className="app__add-task">
      {file && file.type.startsWith("image") && (
        <img
          src={URL.createObjectURL(file)}
          alt="task-img"
          style={{ width: "200px", height: "220px" }}
        />
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="add-task__file">
          <BiImageAdd />
        </label>
        <input
          id="add-task__file"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label>Add Task Name:</label>
        <input
          type="text"
          placeholder="Add your task title here.."
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Add Task Description:</label>
        <textarea
          type="text"
          placeholder="Add your task desctiption here.."
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTask;
