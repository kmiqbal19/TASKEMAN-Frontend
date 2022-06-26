import React, { useState, useEffect } from "react";
import "./singlePageTask.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { MdAddPhotoAlternate } from "react-icons/md";
function SinglePageTask() {
  const [task, setTask] = useState({});
  const [updateMode, setUpdateMode] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const token = useSelector((store) => store.auth.userData.token);
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`/tasks/${path}`, config);
        setTask(res.data.data.task);
        setTitle(res.data.data.task.taskTitle);
        setDescription(res.data.data.task.taskDescription);
      } catch (err) {
        console.log(err);
        toast.error("⚠️ Couldn't find the task");
      }
    };
    fetchTask();
    return () => {
      setTask({});
    };
  }, [path, token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("taskTitle", title);
    data.append("taskDescription", description);
    data.append("photo", file);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.patch(`/tasks/${path}`, data, config);
      setTask(res.data.data.task);

      setUpdateMode(false);
    } catch (error) {}
  };
  return (
    <div className="app__single-task">
      {!updateMode && (
        <img src={`http://localhost:5000/tasks/${task.photo}`} alt="task-img" />
      )}
      {updateMode && !file && (
        <img src={`http://localhost:5000/tasks/${task.photo}`} alt="task-img" />
      )}
      {updateMode && file && file.type.startsWith("image") && (
        <img src={URL.createObjectURL(file)} alt="task-img" />
      )}
      {updateMode && file && !file.type.startsWith("image") && (
        <h1>⚠️ Please upload image only! It will cause an error...</h1>
      )}
      <form onSubmit={handleSubmit} className="single-task__description">
        <div className="single-task__description--edit-icons">
          <FiEdit />
          <AiOutlineDelete />
        </div>
        {updateMode && (
          <>
            <label htmlFor="file-update">
              <MdAddPhotoAlternate />
              Click here to add photo...
            </label>
            <input
              id="file-update"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </>
        )}
        <p>Created On: </p>
        <p>{new Date(task.createdAt).toLocaleString("en-US")}</p>
        <p>Task Title: </p>
        {updateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <p>{task.taskTitle}</p>
        )}
        <p>Task Description: </p>
        {updateMode ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p>{task.taskDescription}</p>
        )}
        <div className="single-task__description--buttons">
          <button type="submit">Update</button>
          <button>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default SinglePageTask;
